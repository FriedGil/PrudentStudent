async function get_audio(){

 const accessToken = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlFVUTRNemhDUVVWQk1rTkJNemszUTBNMlFVVTRRekkyUmpWQ056VTJRelUxUTBVeE5EZzFNUSJ9.eyJodHRwczovL3BsYXRmb3JtLnN5bWJsLmFpL3VzZXJJZCI6IjQ1MDQ0MzAzMzQ5Njc4MDgiLCJpc3MiOiJodHRwczovL2RpcmVjdC1wbGF0Zm9ybS5hdXRoMC5jb20vIiwic3ViIjoiNElWYzBiUWthZWNoYXB6bjR4YkllZWRNaEd3S2pxVU9AY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vcGxhdGZvcm0ucmFtbWVyLmFpIiwiaWF0IjoxNjYxNjA1ODEyLCJleHAiOjE2NjE2OTIyMTIsImF6cCI6IjRJVmMwYlFrYWVjaGFwem40eGJJZWVkTWhHd0tqcVVPIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.p7GM_RI-FqSSSgoRgFwI6q8d2w9TXACvx7zY-1Jf1XPPc7DQWd3kHa1Om7NQk2rNx98DAFPt1o4l-iix02KMv_QZlAVR_2ntQFGU8TOwWmqqTnwzYBMyJn3vpO4d2IDKU-xe0haly1OeElvh4pzy83Yy7IaKn3tJ0epmzLu4tAhEqBP-Xbgf07KiM3x8OqaUFf76tG32XdeXupx6wZHLlR5SEhiH5hE1ae-NibZZ2xeRJiL3ex1--FTeAr0bbwHPfy5WvIKMR_x-K1_qvEAH8ZmfczClQlXZX1zKdCOuFcn7siMjmlJPTgUHnGro7-ME-fiyJIdVV_f4DR_2ullBWQ";
 const uniqueMeetingId = btoa('user@example.com')
 const symblEndpoint = `wss://api.symbl.ai/v1/streaming/${uniqueMeetingId}?access_token=${accessToken}`;
 
 // Have audio context instance created for getting sample rate and audio processing handler.
 const context = new AudioContext();
 
 const ws = new WebSocket(symblEndpoint);
 let stop = document.getElementById('btnStop');
 let entry_zone = document.getElementById('textHere');

 stop.addEventListener('click', ()=>{
  console.log()
  ws.close();
});
 // Fired when a message is received from the WebSocket server
 ws.onmessage = (event) => {
   // You can find the conversationId in event.message.data.conversationId;
   const data = JSON.parse(event.data);
   if (data.type === 'message' && data.message.hasOwnProperty('data')) {
     console.log('conversationId', data.message.data.conversationId);
   }
   if (data.type === 'message_response') {
     for (let message of data.messages) {
       console.log('Transcript (more accurate): ', message.payload.content);
       result = message.payload.content;
       result = result.toLowerCase();
       result = result.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
       entry_zone.value = (result);
     }
   }
   //Boilerplate for accessing symbl api
  //  if (data.type === 'topic_response') {
  //    for (let topic of data.topics) {
  //      console.log('Topic detected: ', topic.phrases)
  //    }
  //  }
  //  if (data.type === 'insight_response') {
  //    for (let insight of data.insights) {
  //      console.log('Insight detected: ', insight.payload.content);
  //    }
  //  }
  //  if (data.type === 'message' && data.message.hasOwnProperty('punctuated')) {
  //    console.log('Live transcript (less accurate): ', data.message.punctuated.transcript)
  //  }
  //  console.log(`Response type: ${data.type}. Object: `, data);
 };
 
 // Fired when the WebSocket closes unexpectedly due to an error or lost connetion
 ws.onerror  = (err) => {
   console.error(err);
 };
 
 // Fired when the WebSocket connection has been closed
 ws.onclose = () => {
   console.info('Connection to websocket closed');
 };
 
 // Fired when the connection succeeds.
 ws.onopen = (event) => {
   ws.send(JSON.stringify({
     type: 'start_request',
     meetingTitle: 'Websockets How-to', // Conversation name
     insightTypes: ['question', 'action_item'], // Will enable insight generation
     config: {
       confidenceThreshold: 0.5,
       languageCode: 'en-US',
       speechRecognition: {
         encoding: 'LINEAR16',
         sampleRateHertz: context.sampleRate, // Get sample rate from browser's audio context
       }
     },
     speaker: {
       userId: 'tony@starkindustries.com',
       name: 'Tony Stark',
     }
   }));
 };
 
 const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
 
 /**
  * The callback function which fires after a user gives the browser permission to use
  * the computer's microphone. Starts a recording session which sends the audio stream to
  * the WebSocket endpoint for processing.
  */
 const handleSuccess = (stream) => {
   const source = context.createMediaStreamSource(stream);
   const processor = context.createScriptProcessor(1024, 1, 1);
   const gainNode = context.createGain();
   source.connect(gainNode);
   gainNode.connect(processor);
   processor.connect(context.destination);
   processor.onaudioprocess = (e) => {
     // convert to 16-bit payload
     const inputData = e.inputBuffer.getChannelData(0) || new Float32Array(this.bufferSize);
     const targetBuffer = new Int16Array(inputData.length);
     for (let index = inputData.length; index > 0; index--) {
         targetBuffer[index] = 32767 * Math.min(1, inputData[index]);
     }
     // Send audio stream to websocket.
     if (ws.readyState === WebSocket.OPEN) {
       ws.send(targetBuffer.buffer);
     }
   };
 };
 
 handleSuccess(stream);
}