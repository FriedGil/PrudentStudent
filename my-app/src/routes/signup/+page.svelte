<script lang="ts">
  export let errors: { username: string, message: string };
  let username: string, password: string;
  const signin = async (e: SubmitEvent) => {
    const form = e.target as HTMLFormElement
    form.submit();
  }

</script>

<div class="hero min-h-screen bg-base-200">
  <div class="hero-content flex-col lg:flex-row-reverse">
    <div class="text-center lg:text-left">
      <h1 class="text-5xl font-bold">Sign Up!</h1>
      <p class="py-6">Sign up now to join our revolution against the edutech establishment. </p>
    </div>
    <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <div class="card-body">
        <div class="form-control">
          <label class="label">
            <span class="label-text">Email</span>
          </label>
          <input type="text" placeholder="Type here" class="input input-ghost w-full max-w-xs" />
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Password</span>
          </label>
          <input type="text" placeholder="Type here" pattern="^(?=.[A-Za-z])(?=.\d)[A-Za-z\d]{8}$"  class="input input-ghost w-full max-w-xs"/>
        </div>
        <div class="form-control mt-6">
          <button class="btn btn-primary">Login</button>
        </div>
      </div>
    </div>
  </div>
</div>
