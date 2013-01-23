$(function(){
    cal_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    mois = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'aout', 'septemble', 'octobre', 'novembre', 'décembre'];
    days = ['l', 'm','m','j','v','s','d'];
    today = new Date();
    thisDay = today.getUTCDate();
    thisMonth = today.getUTCMonth();
    console.log(thisDay);
    
    for(var i = 0; i < days.length; i++){
        if(i%7 <=4){
            $('#calendar').append($('<div/>').addClass('names').html(days[i])); 
        } 
    }
    
    $('#calendar').append($('<div/>').addClass('spacer'));
    
    for(var i = thisDay-7 - (thisDay%7); i < thisDay; i++){
        if(i%7 == 0){
            $('#calendar').append($('<div/>').addClass('spacer'));
        }
        if(i%7 <=4){
            $('#calendar').append($('<div/>').addClass('blank').html(i)); 
        }
    }
    
    var j = thisDay;
    for(var i = thisDay; i < 1000; i++){
        if(i%7 == 0){
            $('#calendar').append($('<div/>').addClass('spacer'));
        }
        
        if(i%7 <=4){
            div = $('<div/>').addClass('blank').html(j);
            if(i==thisDay){
                div.css({'margin': '1px', 'border': 'solid #CCCCCC 1px'})
            }
            $('#calendar').append(div); 
        } else if((i%7 ==6) && (j<=7)) {
            $('#calendar').append($('<div/>').addClass('mois').html(mois[thisMonth]));
        }
        
        
    
  
        var monthLength = cal_days_in_month[thisMonth%12];
        if (thisMonth%12 == 1) { 
            if((this.year % 4 == 0 && this.year % 100 != 0) || this.year % 400 == 0){
                monthLength = 29;
            }
        }
        if(j >= monthLength){
            j=0;
            thisMonth++;
            
        }
        j++;
    }
    
    
});