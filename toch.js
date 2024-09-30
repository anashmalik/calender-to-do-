let nav = 0;
let clicked = null;
let gdate = "";
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];
const calender = document.getElementById('calendar');
function openEvent(date) {
    clicked = date;
    document.getElementById('newEventModal').style.display = 'block';
}
function load() {
    var dt = new Date();
    dt.setMonth(new Date().getMonth() + nav);
    const da = dt.getDate();
    const mo = dt.getMonth();
    const ye = dt.getFullYear();
    const firstday = new Date(ye, mo, 1);
    const daysinmo = new Date(ye, mo + 1, 0).getDate();
    const pdays = firstday.getDay();
    document.getElementById('monthDisplay').innerText = `${dt.toLocaleDateString('en', { month: 'long' })} ${ye}`;
    calender.innerHTML = '';
    for (let i = 1; i <= pdays + daysinmo; i++) {
        const day_squ = document.createElement('div');
        day_squ.classList.add('day');
        const dd = `${mo}/${i - pdays}/${ye}`;
        const ev = events.find(e => e.date == dd);
        if (nav == 0 && i - pdays == da) {
            day_squ.classList.add('lo');

        }
        else if (gdate == dd) {
            day_squ.classList.add('goto_day');
        }
        if (i > pdays) {
            day_squ.innerText = i - pdays;
            day_squ.addEventListener('click', () => openEvent(`${mo}/${i - pdays}/${ye}`));

        }
        else {
            day_squ.classList.add("padding");
        }
        if (ev) {
            var te = ev.even;
            if (te.length < 2) {
                te.forEach(item => {
                    const temp = document.createElement('p');
                    temp.classList.add('event');
                    temp.innerText = item.title;
                    temp.addEventListener('click', () => openList(dd));
                    day_squ.appendChild(temp);
                });
            }
            else {
                let temp = document.createElement('p');
                temp.classList.add('event');
                temp.innerText = te[0].title;
                day_squ.appendChild(temp);
                var but = document.createElement('p');
                but.classList.add('morebut');
                but.innerText = 'more';
                but.addEventListener('click', () => openList(dd));
                day_squ.appendChild(but);
            }

        }
        calender.appendChild(day_squ);
    }
}
function butoonwork() {
    document.getElementById('nextButton').addEventListener('click', () => {
        nav++;
        load();
    });
    document.getElementById('backButton').addEventListener('click', () => {
        nav--;
        load();
    });
    document.getElementById('reset').addEventListener('click', () => {
        localStorage.clear()
        window.location.reload();
    });
    document.getElementById('enterDate').addEventListener('click', () => {
        var t = document.querySelector('.goto');
        t.style.display = 'block';
        var di = document.createElement('botton');
        di.classList.add('gotobu');
        di.innerText = 'submit';
        di.addEventListener('click', () => {
            const eDate = document.getElementById('enteredDate');
            if (eDate.value) {
                gdate = ((parseInt(eDate.value.substr(5, 2))) - 1) + '/' + parseInt(eDate.value.substr(8)) + '/' + eDate.value.substr(0, 4)
                nav = 0;
                nav += ((parseInt(eDate.value.substr(0, 4))) - (new Date).getFullYear()) * 12;
                nav += ((parseInt(eDate.value.substr(5, 2))) - (new Date).getMonth() - 1);
                t.style.display = 'none';
                load();

            }
            else {
                document.querySelector("#Daterror").innerText = "Enter valid date";
            }


        });
        t.appendChild(di);
        di = document.createElement('botton');
        di.classList.add('gotobut');
        di.innerText = 'Close';
        di.addEventListener('click', () => {
            document.querySelector("#Daterror").innerText = " ";
            t.style.display = 'none';

        });
        t.appendChild(di);

    });

    document.getElementById('cancelButton').addEventListener('click', () => {
        document.getElementById('newEventModal').style.display = 'none';
        document.getElementById('eventTitleInput').classList.remove('error');
        document.getElementById('timerror').innerText="";
        document.getElementById('eventTitleInput').value = '';
        document.getElementById('eventtime').value='';


    });
    document.getElementById('saveButton').addEventListener('click', savefun );
    document.getElementById('eventTitleInput').addEventListener('keypress',()=>{
        if(event.key === 'Enter'){
            savefun();
        }
    });
    document.getElementById('eventtime').addEventListener('keypress',()=>{
        if(event.key === 'Enter'){
            savefun();
        }
    });

}
function savefun(){
    
    {
        const inpti = document.getElementById('eventTitleInput');
        const intime=document.getElementById('eventtime');
        if (inpti.value && intime.value) {
            inpti.classList.remove('error');
            document.getElementById('timerror').innerText="";
            let lev = events.find(e => e.date == clicked);
            events = events.filter(e => e.date != clicked);
            var ev;
            if (!lev) {
                ev = [];
            }
            else {
                ev = lev.even;
            }
            let a="";
            a=intime.value.substr(0, 2)+intime.value.substr(3, 2);
            ev.push({title:inpti.value,time:a});
            ev.sort((a,b) =>a.time - b.time);
            events.push({
                date: clicked,
                even: ev,
            });
            localStorage.setItem('events', JSON.stringify(events));
            document.getElementById('newEventModal').style.display = 'none';
            inpti.value = '';
            intime.value='';
            load();

        }
        else {
            document.getElementById('timerror').innerText="enter a valid Event title or Date";
            inpti.classList.add('error');
        }
    }
}
function openList(dd) {
    var t = document.getElementById('more');
    t.style.display = 'block';
    var te = events.find(e => e.date == dd).even;
    t.innerHTML = '<h2>Event List:-</h2><br>';
    te.forEach(item => {
        const temp = document.createElement('h2');
        temp.classList.add('event');
        temp.innerText =item.time.substr(0, 2)+":"+item.time.substr(2, 2)+"   -"+ item.title;
        temp.addEventListener('click', () => openevent(dd, item));
        t.appendChild(temp);
        var b = document.createElement('button');
        b.classList.add("delbut");
        b.innerText = 'DELETE';
        b.addEventListener('click', () => {
            var dateEv = events.find(e => e.date == dd).even;
            events = events.filter(e => e.date != dd);
            dateEv = dateEv.filter(i => i.title != item.title);

            events.push({
                date: dd,
                even: dateEv,
            });
            localStorage.setItem('events', JSON.stringify(events));
            t.innerHTML = '<h2>Event List</h2>';
            if (dateEv.length == 0) {
                t.innerHTML = '<h2>Event List</h2>';
                document.getElementById('newEventModal').style.display = 'none';
                document.getElementById('more').style.display = 'none';
                load();
            }
            else
                openList(dd);
        });
        t.append(b);
    });
    var b = document.createElement('br');
    t.appendChild(b);   
    b = document.createElement('button');
    b.classList.add("clbut");
    b.innerText = 'CLOSE';
    b.addEventListener('click', () => {
        document.getElementById('newEventModal').style.display = 'none';
        document.getElementById('more').style.display = 'none';
        load();

    });
    t.appendChild(b)
}
butoonwork();
load();