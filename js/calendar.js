
cal_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
mois = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'aout', 'septemble', 'octobre', 'novembre', 'décembre'];
days = ['l', 'm','m','j','v','s','d'];
today = new Date();
thisDay = today.getDate();
thisMonth = today.getMonth();
thisYear = today.getFullYear();


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
        $("#projects ul").append($("<li/>").append($('<span/>').css("background-color", project.color)).append(project.nom));
        $("#"+ project.deadline).css({"background-color": project.color, "color":"#FFFFFF"});
    });
}

function createCalendar(){
    displayWeeks();
    beforeToday(6);
    createInterval(today, thisDay, 1000);
}

function beforeToday(numWeeks){

    var _today = new Date();
    _today.setDate( today.getDate() - (numWeeks *7) - (thisDay%7)  );
    
    var _thisDay = _today.getDate();
    var _thisMonth = _today.getMonth();
    var _thisYear = _today.getFullYear();
    
    var oneDay = 24*60*60*1000;	
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
            $('#weekNames').append($('<div/>').addClass('names').html(days[i])); 
        } 
    }
    
    $('#calendar').append($('<div/>').addClass('spacer'));
}

function createDay(i, d, _date, _thisMonth, _thisYear){
    
    if(i % 7 == 0){
        $('#calendar').append($('<div/>').addClass('spacer'));
    }
    var div = $('<div/>').addClass('blank').attr('id',pad(d, 2) + "-" + pad((_thisMonth + 1), 2) + "-" + _thisYear).html(d); 
           
    if(i == thisDay && _date == today){
        div.addClass('today');
        
    }
    if(i%7 <=4){
        $('#calendar').append(div);
    }
}


function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }

    return str;
}