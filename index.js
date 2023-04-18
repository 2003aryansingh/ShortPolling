const app = require("express")();

const jobs = {}; 

app.post("/submit", (req,res)=> {
    const jobID = `job:${Date.now()}`; //generating a random jobID using the Date.now() function
    jobs[jobID] = 0;  // Setting the progress to 0 initially
    updateJob(jobID,0);
    res.end("\n\n"+ jobID + "\n\n"); //logging the jobID to the client
});


app.get("/checkstatus", (req,res)=> { //route to check for the progress of the job
    console.log(jobs[req.query.jobID]); //logging the progress to the user as a response to the short poll
    res.end("\n\nJobStatus: " + jobs[req.query.jobID] + "%\n\n");
});


app.listen(8080, ()=> {
    console.log("listening on 8080");
})

function updateJob(jobID, prg) { //function to fake the job progress using the setTimeout function to update progress by 10% every single time
    jobs[jobID] = prg;
    console.log(`updated ${jobID} to ${prg}`);
    if(prg == 100) return;
    this.setTimeout(() => {
        updateJob(jobID, prg + 10)
    }, 3000);
};