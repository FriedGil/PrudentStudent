<script>
//// @ts-nocheck
import * as qna from '@tensorflow-models/qna';
import '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-cpu';
import '@tensorflow/tfjs-backend-webgl';
import bird from '$lib/assets/bird.png';
import { onMount } from 'svelte'
import { themeChange } from 'theme-change'

onMount(() => {
  themeChange(false)
})

let text_value = `query here`;
let top_result = 'result here';

 function switch_color(){
document.getElementById('cswitch').click();
}

async function get_audio(){
    const accessToken = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlFVUTRNemhDUVVWQk1rTkJNemszUTBNMlFVVTRRekkyUmpWQ056VTJRelUxUTBVeE5EZzFNUSJ9.eyJodHRwczovL3BsYXRmb3JtLnN5bWJsLmFpL3VzZXJJZCI6IjQ1MDQ0MzAzMzQ5Njc4MDgiLCJpc3MiOiJodHRwczovL2RpcmVjdC1wbGF0Zm9ybS5hdXRoMC5jb20vIiwic3ViIjoiNElWYzBiUWthZWNoYXB6bjR4YkllZWRNaEd3S2pxVU9AY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vcGxhdGZvcm0ucmFtbWVyLmFpIiwiaWF0IjoxNjYxNjA1ODEyLCJleHAiOjE2NjE2OTIyMTIsImF6cCI6IjRJVmMwYlFrYWVjaGFwem40eGJJZWVkTWhHd0tqcVVPIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.p7GM_RI-FqSSSgoRgFwI6q8d2w9TXACvx7zY-1Jf1XPPc7DQWd3kHa1Om7NQk2rNx98DAFPt1o4l-iix02KMv_QZlAVR_2ntQFGU8TOwWmqqTnwzYBMyJn3vpO4d2IDKU-xe0haly1OeElvh4pzy83Yy7IaKn3tJ0epmzLu4tAhEqBP-Xbgf07KiM3x8OqaUFf76tG32XdeXupx6wZHLlR5SEhiH5hE1ae-NibZZ2xeRJiL3ex1--FTeAr0bbwHPfy5WvIKMR_x-K1_qvEAH8ZmfczClQlXZX1zKdCOuFcn7siMjmlJPTgUHnGro7-ME-fiyJIdVV_f4DR_2ullBWQ";
    const uniqueMeetingId = btoa('user@example.com')
    const symblEndpoint = `wss://api.symbl.ai/v1/streaming/${uniqueMeetingId}?access_token=${accessToken}`;
    const context = new AudioContext();
    const ws = new WebSocket(symblEndpoint);
    let stop = document.getElementById('btnStop');
    stop.addEventListener('click', ()=>{
    console.log()
    ws.close();
    });
    ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === 'message' && data.message.hasOwnProperty('data')) {
        console.log('conversationId', data.message.data.conversationId);
    }
    if (data.type === 'message_response') {
        for (let message of data.messages) {
        console.log('Transcript (more accurate): ', message.payload.content);
        text_value = message.payload.content;
        text_value = text_value.toLowerCase();
        text_value = text_value.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
        }
    }
    };
    ws.onerror  = (err) => {
    console.error(err);
    };
    ws.onclose = () => {
    console.info('Connection to websocket closed');
    };
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
    const handleSuccess = (stream) => {
    const source = context.createMediaStreamSource(stream);
    const processor = context.createScriptProcessor(1024, 1, 1);
    const gainNode = context.createGain();
    source.connect(gainNode);
    gainNode.connect(processor);
    processor.connect(context.destination);
    processor.onaudioprocess = (e) => {
        const inputData = e.inputBuffer.getChannelData(0) || new Float32Array(this.bufferSize);
        const targetBuffer = new Int16Array(inputData.length);
        for (let index = inputData.length; index > 0; index--) {
            targetBuffer[index] = 32767 * Math.min(1, inputData[index]);
        }
        if (ws.readyState === WebSocket.OPEN) {
        ws.send(targetBuffer.buffer);
        }
    };
    };
    handleSuccess(stream);

}

function answerq(question)
{
qna.load().then(model => {
    let passage = `Your name is Pru. You are an AI assistant developed by using both mobilebert and symblai. You can answer questions and navigate around the website.
    Prudent Student is an academic administration tool developed during Ignition Hacks 2022. Prudent Student is made special by its advanced tooling, clean UI, and functionality.
    Despite an increasing shift towards using web technology for student administration, what's wrong with existing technologies is that they are either bloated, outdated, backed by morally reprehensive big tech companies, or all three.
    Prudent Student, built during Ignition Hacks 2022, is a smart student administration platform that balances functionality, speed, and ease of use.

    `
    model.findAnswers(question, passage).then(answers => {
        top_result = answers[0].text;
        console.log(top_result=top_result);
        return (top_result);
    });

  });
}

async function execute(text){
    var words = text.split(" ");
    switch(words[0]) {
        case "go":
            if (words.includes("home")){
            document.location.href="/";
            }
            else if (words.includes("classes")){
            document.location.href=`/classes`;
            }
            else if (words.includes("about")){
                console.log("going to about")
            document.location.href=`/about`;
            }
            break;
        case "action":
            if ((words.includes("log") && words.includes("out")) || (words.includes("logout"))){

            }
            else if (words.includes("refresh") || words.includes("reload") ){
            document.location.reload(); 
            }
            else if ((words.includes("dark")) || (words.includes("light"))) {
                console.log("here")
                switch_color();

            }
            break;
        default:
            top_result = await answerq(text);
} 
}
</script>

<label for="my-modal" class="btn modal-button fixed bottom-10 right-10">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c1.103 0 2 .897 2 2v7c0 1.103-.897 2-2 2s-2-.897-2-2v-7c0-1.103.897-2 2-2zm0-2c-2.209 0-4 1.791-4 4v7c0 2.209 1.791 4 4 4s4-1.791 4-4v-7c0-2.209-1.791-4-4-4zm8 9v2c0 4.418-3.582 8-8 8s-8-3.582-8-8v-2h2v2c0 3.309 2.691 6 6 6s6-2.691 6-6v-2h2zm-7 13v-2h-2v2h-4v2h10v-2h-4z"/></svg>
</label>

<input type="checkbox" id="my-modal" class="modal-toggle" />
<label for="my-modal" class="modal cursor-pointer">
    <label class="modal-box relative" for="">
        <body>
            <button on:click|self="{get_audio}" class="btn">Audio On</button>
            <button class="btn" id="btnStop">Audio Off</button>
            <button on:click|self="{execute(text_value)}" class="btn" id="btnStop">Query</button>
            <textarea class="textarea" bind:value={text_value}></textarea>
            <textarea class="textarea" bind:value={top_result} disabled></textarea>
            <div class="divider"></div>
            <div class="avatar">
                <div class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={bird}/>
                </div>
              </div>
              <br>
              <br>
            <p>
                Hey! I'm your AI assistant. Try turning on audio and asking me what my name is.
            </p>

        </body>
    </label>
</label>

<button id = "cswitch" data-toggle-theme="light,dark" data-act-class="ACTIVECLASS"></button>