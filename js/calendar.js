
cal_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
mois = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'aout', 'septemble', 'octobre', 'novembre', 'décembre'];
days = ['l', 'm','m','j','v','s','d'];
today = new Date();
thisDay = today.getDate();
thisMonth = today.getMonth();
thisYear = today.getFullYear();
oneDay = 24*60*60*1000;	

$(function(){
    createCalendar();
    getProjects();
});



function getProjects(){
    $.getJSON("projets.json", jsonHandler);
}

function jsonHandler(data){
    console.log(data);
    $.each(data.projects, function(i, project){
        console.log(project);
        $("#projects ul").append($("<li/>").append($('<span/>').css("background-color", project.color).append()).append(project.nom));
        $("#"+ project.deadline).css({
            "border-color": project.color, 
            "color":project.color
        });
        
        fillProjects(project.debut, project.fin, project.color, project.onWeekend);
    });
}

function fillProjects(_from, _to, color, onWeekend){
    var from = new Date(_from);
    var to = new Date(_to);
    
    
    console.log(from.toLocaleString());
    
    
    var diffDays = Math.abs((from.getTime() - to.getTime())/(oneDay));

    
    for(var i = 0 ; i < diffDays+1; i++){
        var box = new Date(from);
        box.setDate(from.getDate() + i);
        

        var _thisDay = pad(box.getDate(),2);
        var _thisMonth = pad( (box.getMonth()+1 ),2);
        var _thisYear = pad(box.getFullYear(),2);
        
        var str = _thisMonth + "-" + _thisDay + "-" + _thisYear;
        
        console.log(box.getDay());
        
        
        
        if((box.getDay()+6)%7 <= 4 || onWeekend == 'true'){
            $("#"+ str).css({
                "background-color": color, 
                "color": "#FFFFFF"
            });
        }
        
    }
    
}

function createCalendar(){
    displayWeeks();
    beforeToday(2);
    createInterval(today, thisDay, 1000);
}

function beforeToday(numWeeks){

    var _today = new Date();
    _today.setDate( today.getDate() - (numWeeks *7) - (thisDay%7)  );
    
    var _thisDay = _today.getDate();
    var _thisMonth = _today.getMonth();
    var _thisYear = _today.getFullYear();
    
    
    var diffDays = Math.abs((today.getTime() - _today.getTime())/(oneDay));

    createInterval(_today, 0, diffDays);
}

function createInterval(_date, from, to){
    
    var _thisDay = _date.getDate();
    var _thisMonth = _date.getMonth();
    var _thisYear = _date.getFullYear();
    var j = _thisDay;
    
    for(var i = from; i < to; i++){
        createDay(i, j, _date, _thisMonth, _thisYear);
            
        if((i%7 ==6) && (j<=7)) {
            $('#calendar').append($('<div/>').addClass('mois').html(mois[_thisMonth]));
        }

        var monthLength = cal_days_in_month[_thisMonth%12];
        
        if (_thisMonth%12 == 1) { 
            if((this.year % 4 == 0 && this.year % 100 != 0) || this.year % 400 == 0){
                monthLength = 29;
            }
        }
        
        if(j >= monthLength){
            j=0;
            _thisMonth++;
            if(_thisMonth >= 12) {
                _thisMonth = 0;
                _thisYear++;
            }
            
        }
        j++;
    }
}

function displayWeeks(){
    for(var i = 0; i < days.length; i++){
        if(i%7 <=4){
            
        } 
        $('#weekNames').append($('<div/>').addClass('names').html(days[i])); 
    }
    
    $('#calendar').append($('<div/>').addClass('spacer'));
}

function createDay(i, d, _date, _thisMonth, _thisYear){
    
    if(i % 7 == 0){
        $('#calendar').append($('<div/>').addClass('spacer'));
    }
    var div = $('<div/>').addClass('blank').attr('id',pad((_thisMonth + 1), 2) + "-" +pad(d, 2) + "-" +  _thisYear).html(d); 
           
    if(i == thisDay && _date == today){
        div.addClass('today');
        
    }
    if(i%7 >4){
        div.addClass('weekend');
    }
    $('#calendar').append(div);
}


function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }

    return str;
}