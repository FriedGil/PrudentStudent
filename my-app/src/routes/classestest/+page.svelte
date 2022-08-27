<script>
    //Replace with classes query for user
    let classes = [
        {name: 'Algebra 2', teacher: 'Gil Friedman', route: "abcd"},
        {name: 'English 10', teacher: 'Gil Friedman', route: "abcd"},
        {name: 'English 11', teacher: 'Gil Friedman', route: "abcd"},
        {name: 'English 12', teacher: 'Gil Friedman', route: "abcd"},
        {name: 'English 13', teacher: 'Gil Friedman', route: "abcd"}
    ]
</script>
<h1 class="text-5xl font-bold bg-base-200 text-center pt-6">Classes</h1>

<div class="hero min-h-screen bg-base-200">
    
    <div class="grid grid-cols-4 gap-4">
        {#each classes as school_class}
            <div class="card w-96 bg-base-100 shadow-xl">
                <div class="card-body">
                    <h2 class="card-title">{school_class.name}</h2>
                    <h2 class="card-subtitle">{school_class.teacher}</h2>
                    <div class="card-actions justify-end">
                        <a href ="/{school_class.route}"><button class="btn btn-primary">Open</button></a>
                    </div>
                </div>
            </div>
        {/each}
    </div>
</div>