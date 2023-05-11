let todoSearchBar = document.getElementById("todoSearchBar");
let todoSectionWrapper = document.getElementsByClassName("todoSectionWrapper")[0];
let rankingToDo = document.getElementById('rankingToDo');
let pointerTodoCount = 0;
let rankingStatus = {'select':'#fffff','High':'red','Medium':'yellow','Low':'green'};
todoDeleteTrigger = '';
let tempcalculateAlarmTimeMilliSec = 0;
var checkbox = document.querySelector('input[type="checkbox"]');

// Getting Current Date
function getTodayDate(){
    todayDate = new Date();
    date = todayDate.getDate()+'-'+(todayDate.getMonth()+1)+'-'+todayDate.getFullYear()
    return date;
}
todoSearchBar.addEventListener("keypress",(e)=>{
    if (e.key === 'Enter'){
        alert(todoSearchBar.value);
        let ranking = 0;
        payload = {'ranking':rankingToDo.value,'content':todoSearchBar.value,'date':getTodayDate()}
        localStorage.setItem(String(pointerTodoCount+1),JSON.stringify(payload));
        document.querySelector("#rankingToDo").parentNode.reset()
        showTodoItems("any");
    }
})

rankingToDo.addEventListener('change',()=>{
    if(todoSearchBar.value!=""){
        payload = {'ranking':rankingToDo.value,'content':todoSearchBar.value,'date':getTodayDate()}
        localStorage.setItem(String(pointerTodoCount+1),JSON.stringify(payload));
        showTodoItems("any");
        document.querySelector("#rankingToDo").parentNode.reset()

    }
})

// To Show All List Value from Local Storage
function showTodoItems(req){
    todoSectionWrapper.innerHTML = '';
    for (var i in localStorage){
        if(i>=0){
            let payload = JSON.parse(localStorage.getItem(i));
            if(payload['ranking'] == req || req == 'any'){
            let div = document.createElement('div');
            div.className = 'todoSection';
            console.log(payload['ranking'],req);
            div.style.backgroundColor = rankingStatus[payload['ranking']];
            div.innerHTML = '<a style="" class="todoDeleteTrigger" href="#" name='+i+' onclick=removeTodoItem('+i+')><img src="media/delete.png"></a><p>'+payload["content"]+'</p><span class="todoDateTrigger"><span>'+payload["date"]+'<span></span>';
            todoSectionWrapper.append(div)
            pointerTodoCount = Math.max(pointerTodoCount,i);
        }
    }
    }
}

// Delete Todo Item
function removeTodoItem(keyItem){
    alert("hfgjkl"+keyItem);
    localStorage.removeItem(keyItem);
    showTodoItems("any")
}

showTodoItems('any');

// var confettiSettings = { target: 'my-canvas' };
// var confetti = new ConfettiGenerator(confettiSettings);
// confetti.render();

// Editable Permission Trigger
let editNotes = document.getElementById('editNotes');
let noteTextarea = document.getElementById('noteTextarea');
let noteSave = document.getElementById('noteSave');
editNotes.addEventListener('click',()=>{
    noteTextarea.classList.toggle('editOptionTrigger');
    noteSave.classList.toggle('editSaveButton');
})

// Save Notes in DB
noteSave.addEventListener('click',()=>{
    localStorage.setItem('notes',noteTextarea.value);
    editNotes.click();
    notificationShow("Your notes has been save");
})

// Received All Notes
function showNotes(){
    return localStorage.getItem('notes');
}

// Full Screen
let relaxMusic = new Audio('media/calm.mp3');
let relax = document.getElementById('relax');
let relaxWrapper = document.getElementsByClassName('relaxWrapper')[0];
relax.addEventListener('click',()=>{
    relaxWrapper.classList.toggle('relaxWrapperVisible');
    pauseRelaxMusic.click();
    if (relaxWrapper.requestFullscreen) {
        relaxWrapper.requestFullscreen();
      } else if (relaxWrapper.webkitRequestFullscreen) { /* Safari */
      relaxWrapper.webkitRequestFullscreen();
      } else if (relaxWrapper.msRequestFullscreen) { /* IE11 */
      relaxWrapper.msRequestFullscreen();
      }
});

// Exit Full Screen

let exitRelax = document.getElementById('exitRelax');
exitRelax.addEventListener('click',()=>{
    relaxWrapper.classList.toggle('relaxWrapperVisible');
    pauseRelaxMusic.innerHTML = 'Pause';
    document.exitFullscreen();
    muteMusic();
})

// Pause Music
let pauseRelaxMusic = document.getElementById("pauseRelaxMusic");
pauseRelaxMusic.addEventListener("click",()=>{
    console.log("Mute Music"+relaxMusic.pause);
    if(relaxMusic.paused){
        pauseRelaxMusic.innerHTML = 'Pause';
        relaxMusic.play();
        checkbox.dispatchEvent(new Event('change'));
    }
    else{
        pauseRelaxMusic.innerHTML = 'Unpause';
        muteMusic();
    }
    
})

// Mute Music
function muteMusic(){
    relaxMusic.pause();
    clearInterval(setQuoteCheckVal);
    clearInterval(setQuoteCheckVal);
}

// Search Query
let preQuery = 'https://www.google.com/search?q=';
let googleSearchField = document.getElementById("googleSearchField");
let googleSearchButton = document.getElementById('googleSearchButton');

googleSearchButton.addEventListener('click',()=>{
    window.open(preQuery+''+googleSearchField.value, '_blank');
    googleSearchField.value = '';
})


// show Alarm Time
let setHour = document.getElementById("setHour");
let setMinute = document.getElementById("setMinute");
let hourShow = document.getElementsByClassName("hourShow")[0];
let minuteShow = document.getElementsByClassName("minuteShow")[0];
let hourShow1 = document.getElementsByClassName("hourShow")[1];
let minuteShow1 = document.getElementsByClassName("minuteShow")[1];
let alarmTime = 0;
function showAlarmTime(){
    hourShow.innerText = setHour.value +' Hour :';
    minuteShow.innerText = setMinute.value + ' Minute';

    hourShow1.innerText = setHour.value +' Hour :';
    minuteShow1.innerText = setMinute.value + ' Minute';

    alarmTime = setHour.value+' '+setMinute.value;
}

setHour.addEventListener('change',()=>{
    showAlarmTime();
});

setMinute.addEventListener('change',()=>{
    showAlarmTime();
});

// Display Remaining Alarm Time Alarm Board
let clearAlarmBoardInterval = 0;
let alarmDisplayBoard  = ()=>
clearAlarmBoardInterval = setInterval(calculateTime, 1000);



// Alarm Watch Set Screen to Next Screen 
let setTimerButton = document.getElementsByClassName("setTimerButton")[0];
let alarmClockSectionWrapper = document.getElementsByClassName("alarmClockSectionWrapper")[0];
let timer = document.getElementsByClassName("timer")[0];
setTimerButton.addEventListener("click",()=>{
    alarmClockSectionWrapper.classList.toggle('alarmClockSectionHidden');
    timer.classList.toggle('timerAppear');
    alarm();
    alarmDisplayBoard();
})


// Alarm Calculate Logic
let clearAlarmLogicIteration = 0;
var alarmAudio = new Audio('media/alarm.mp3');
let calculateAlarmTimeMilliSec;
let alarm = ()=> {
    calculateAlarmTimeMilliSec = (alarmTime.split(" ")[0]*60*60 + alarmTime.split(" ")[1]*60)*1000;
    tempcalculateAlarmTimeMilliSec = calculateAlarmTimeMilliSec;
    clearAlarmLogicIteration = setTimeout(()=>{
        console.log("Alarm Time");
        alarmAudio.play();
        clearInterval(clearAlarmBoardInterval);
    },calculateAlarmTimeMilliSec)
    return calculateAlarmTimeMilliSec;
}

// Calculate remaining Alarm Time
let displayRemainingHour = document.getElementsByClassName("displayRemainingHour")[0];
let displayRemainingMinute = document.getElementsByClassName("displayRemainingMinute")[0];
let displayRemainingSecond = document.getElementsByClassName("displayRemainingSecond")[0];
function calculateTime(){
    //console.log("Calculate Time Function");
    if(((tempcalculateAlarmTimeMilliSec / (1000 * 60 * 60)) % 24) >=0){
        displayRemainingHour.innerHTML = "<span>"+parseInt((tempcalculateAlarmTimeMilliSec / (1000 * 60 * 60)) % 24)+" :</span>  <span>Hour</span>";

    }
    if(((tempcalculateAlarmTimeMilliSec / (1000 * 60)) % 60)>=0){
        displayRemainingMinute.innerHTML = "<span>"+parseInt((tempcalculateAlarmTimeMilliSec / (1000 * 60)) % 60)+" :</span>   <span>Minute</span>";
    }
    if(((tempcalculateAlarmTimeMilliSec/1000)%60)>=0){
        displayRemainingSecond.innerHTML = "<span>"+parseInt((tempcalculateAlarmTimeMilliSec/1000)%60)+"</span> <span>Second</span>";
    }
    console.log(tempcalculateAlarmTimeMilliSec/(60*60*1000));
    tempcalculateAlarmTimeMilliSec = tempcalculateAlarmTimeMilliSec- 1000;
}


// Stop Timer
let stopTier = document.getElementsByClassName("stopTier")[0];
stopTier.addEventListener("click",()=>{
    console.log("Stop Timer");
    alarmAudio.pause();
    clearInterval(clearAlarmBoardInterval);
    clearTimeout(clearAlarmLogicIteration);
    alarmClockSectionWrapper.classList.toggle('alarmClockSectionHidden');
    timer.classList.toggle('timerAppear');
})

// Alarm Trigger From Home Screen
let alarmTrigger = document.getElementsByClassName("alarmTrigger")[0];
let alarmClockSection = document.getElementsByClassName("alarmClockSection")[0];
let wrapper = document.getElementsByClassName("wrapper")[0];
alarmTrigger.addEventListener("click",()=>{
    wrapper.classList.toggle("alarmblurBackground");
    alarmClockSection.classList.toggle("alarmClockSectionAppear");
})

let alarmClockSectionClose = document.getElementsByClassName("alarmClockSectionClose")[0];
alarmClockSectionClose.addEventListener("click",()=>{
    alarmTrigger.click();
})

// Drop backUp File
let dropbackUpFile = document.getElementsByClassName("dropbackUpFile")[0];
dropbackUpFile.addEventListener("change",(e)=>{
    readText(e);
})


// Open Setting Section
let settingWrapper = document.getElementsByClassName('settingWrapper')[0];
let setting = document.getElementsByClassName("setting")[0];
setting.addEventListener("click",()=>{
    settingWrapper.classList.toggle("settingWrapperAppear");
    wrapper.classList.toggle("alarmblurBackground");
    settingWrapper.classList.remove("alarmblurBackground");
    autofillSetting();
})

// Close Setting Wrapper
let settingWrapperClose = document.getElementsByClassName("settingWrapperClose")[0];
 settingWrapperClose.addEventListener("click",()=>{
    settingWrapper.classList.toggle("settingWrapperAppear");
    wrapper.classList.toggle("alarmblurBackground");
 })





//  Save  Setting Social Media data
let settingSocialmedia = document.getElementsByClassName("settingSocialmedia");
function saveSocialMedia(){
    payload = {'LinkedIn':settingSocialmedia[0].value,'Twitter':settingSocialmedia[1].value,'Instragram':settingSocialmedia[2].value,'Facebook':settingSocialmedia[3].value,'Github':settingSocialmedia[4].value}
    localStorage.setItem('SocialMedia',JSON.stringify(payload));
}

// Save Setting Important Task
let settingTaskCategory = document.getElementsByClassName("settingTaskCategory");
let settingTask = document.getElementsByClassName("settingTask");

function saveTasks(){
    payload = {'Task1':settingTask[0].value,'TaskCategory1':settingTaskCategory[0].value,'Task2':settingTask[1].value,'TaskCategory2':settingTaskCategory[1].value,'Task3':settingTask[2].value,'TaskCategory3':settingTaskCategory[2].value,'Task4':settingTask[3].value,'TaskCategory4':settingTaskCategory[3].value,'Task5':settingTask[4].value,'TaskCategory5':settingTaskCategory[4].value}
    localStorage.setItem('Tasks',JSON.stringify(payload));
}

// Save Setting Data
let settingSaveButton = document.getElementsByClassName("settingSaveButton")[0];
settingSaveButton.addEventListener("click",()=>{
    saveSocialMedia();
    saveTasks();
    alert("Save Successfully");
})



// Getting Social Media data
function socialMediaaccumulate(){
    payload = JSON.parse(localStorage.getItem("SocialMedia"));
    return payload
}

// Getting Tasks
function taskAccumumalte(){
    payload = JSON.parse(localStorage.getItem("Tasks"));
    return payload;
}

// Getting Notes showNotes()
// Getting Todo Items
function showToDoContaint(){
    let payload = {};
    for (let j in localStorage){
        if(j>=0){
           payload[j] = JSON.parse(localStorage.getItem(j));

         }
    }
    return payload;
}
// BackUp Trigger
let backupTrigger = document.getElementById("backupTrigger");
backupTrigger.addEventListener("click",()=>{
    let payload = JSON.stringify({'socialMedia':socialMediaaccumulate(),'tasks':taskAccumumalte(),'toDo':showToDoContaint(),'notes':showNotes()});
    let filename = "backup.json";
    download(filename,payload);
})

// Download File
// Download File
let download = (filename,text)=>{
    var element = document.createElement("a");
    element.style.display = "none";
    console.log(text);
    element.setAttribute("href","data:text/plain;charset=utf-8,"+encodeURIComponent(text));
    element.setAttribute("download",filename);
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

// Backup File Insertion in Data Base
async function readText(event) {
    const file = event.target.files.item(0)
    const text = await file.text();
    data = JSON.parse(text);

    // console.log(data['notes']);
    console.log(data['toDo']);
    saveBackupTodo(data['toDo']);
    saveBackupSocialMedia(data['socialMedia']);
    saveBackupTasks(data['tasks']);
    saveBackupNotes(data['notes']);

    noteTextarea.value = showNotes();
    showTodoItems("any");
    
    alert('Your Backup file has been save gtaken in DB');

}

// Save data in Data Base through BackUp File
function saveBackupTasks(settingTask){
    payload = {'Task1':settingTask['Task1'],'TaskCategory1':settingTask['TaskCategory1'],'Task2':settingTask['Task2'],'TaskCategory2':settingTask['TaskCategory2'],'Task3':settingTask['Task3'],'TaskCategory3':settingTask['TaskCategory3'],'Task4':settingTask['Task4'],'TaskCategory4':settingTask['TaskCategory4'],'Task5':settingTask['Task5'],'TaskCategory5':settingTask['TaskCategory5']}
    console.log('Tasks = ',payload);
    localStorage.setItem('Tasks',JSON.stringify(payload));
}
function saveBackupSocialMedia(settingSocialmedia){
    payload = {'LinkedIn':settingSocialmedia['LinkedIn'],'Twitter':settingSocialmedia['Twitter'],'Instragram':settingSocialmedia['Instragram'],'Facebook':settingSocialmedia['Facebook'],'Github':settingSocialmedia['Github']}
    localStorage.setItem('SocialMedia',JSON.stringify(payload));
}
function saveBackupNotes(notes){
    payload = notes
    localStorage.setItem('notes',JSON.stringify(payload));
}
function saveBackupTodo(data){
    for(let i in data){
    payload1 = {'ranking':data[i]['ranking'],'content':data[i]['content'],'date':data[i]['date']}
    // console.log(payload1,i);
    localStorage.setItem(String(i),JSON.stringify(payload1));
    }
   
}

// Display Social Media
let socialmedia = document.getElementsByClassName("socialmedia")[0];
function displaySocialMedia(){
    // let socialMediaaccumulate = socialMediaaccumulate();
    let socialMediaDict = socialMediaaccumulate();
    console.log(socialMediaDict);
    for(let j in socialMediaDict){
    let link = document.createElement('a');
    link.href="//"+socialMediaDict[j];
    link.target="_blank"
    let img_ele = document.createElement('img');
    let span_ele = document.createElement('span');
    span_ele.innerText = j;
    console.log(j);
    img_ele.src = 'media/'+ j+".png";
    link.appendChild(img_ele);
    link.appendChild(span_ele);
    socialmedia.append(link);
    }
}

// Show Tasks
let taskWrapper = document.getElementsByClassName("taskWrapper")[0];
function displayTasks(){

    let taskDict = taskAccumumalte();
    console.log(Object.keys(taskDict).length);
    for(j=1;j<=Object.keys(taskDict).length/2;j++){
    // <div class="taskCard">
    // <a href="">Www.fifa</a>
    // </div>TaskCategory1

    let taskcard = document.createElement("div");
    taskcard.className = 'taskCard';
    let link = document.createElement('a');
    link.href = '//'+taskDict['Task'+j];
    link.target="_blank"
    link.innerText = taskDict['Task'+j];
    filepath = 'media/tasks/'+taskDict['TaskCategory'+j]+'.jpg';
    taskcard.style.backgroundImage = "url('"+filepath+"')";
    taskcard.append(link);
    taskWrapper.append(taskcard);
    }

    // // <!-- Add Tasks -->
    // let taskWrapper.append(<div class="">taskCard<a href="">Www.fifa</a></div>
}
// AutoFill Values of Setting Options
function autoFillSocialMedia(){
    let socialMediaDict = socialMediaaccumulate();
    console.log(socialMediaDict);
    for(let j=0;j<5;j++){
        
        if(settingSocialmedia[j].placeholder in socialMediaDict){
            // console.log(settingSocialmedia[j].placeholder,socialMediaDict["LinkedIn"]);
            settingSocialmedia[j].value = socialMediaDict[settingSocialmedia[j].placeholder]; 
        }
    }
}

function autoFillTasks(){
    let taskDict = taskAccumumalte();
    for(j=1;j<=Object.keys(taskDict).length/2;j++){
        settingTask[j-1].value = taskDict['Task'+j];
        settingTaskCategory[j-1].value = taskDict['TaskCategory'+j];
    }
}
function autofillSetting(){
    autoFillTasks();
    autoFillSocialMedia();
}

// Notication
function notificationShow(message) {
    // Get the snackbar DIV
    var x = document.getElementById("notification");
  
    // Add the "show" class to DIV
    x.className = "show";
    x.innerText = message;
    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}


// Filter on ToDo Items
let filterToDoItem = document.getElementsByClassName("filterToDoItem")[0];
filterToDoItem.addEventListener("change",()=>{
    showTodoItems(filterToDoItem.value);
})

// On Off Relax Toggle Button
let setQuoteCheckVal = "";
const setQuoteCheck = ()=>{setQuoteCheckVal = setInterval(calmQuotes,15000)};

document.addEventListener('DOMContentLoaded', function () { 
    checkbox.addEventListener('change', function () {
      if (checkbox.checked) {
        // do this
        setQuoteCheck();
      } else {
        // do that
        clearInterval(setQuoteCheckVal);
        document.getElementById("relaxQuote").innerText ="";
      }
    });
  });

 
// Get Calm Message by API
function calmQuotes(){
    let jsondata = data;
    lenJSON = Object.keys(jsondata).length;
    randomQuotesIndex = Math.floor(Math.random()*lenJSON);
    console.log("calmQuotes triggered");
    document.getElementById("relaxQuote").innerText = jsondata[randomQuotesIndex]['text'];
  }

//   Drop All Data
let dropAllData = document.getElementsByClassName("dropAllData")[0];
dropAllData.addEventListener("click",()=>{
    localStorage.clear();
})
  

clearInterval(setQuoteCheckVal);
displayTasks();
displaySocialMedia();
noteTextarea.value = showNotes();

