$(document).ready(function() {
    const request = new XMLHttpRequest();
    const url = `https://s3.amazonaws.com/wheelhouse-cdn/wheelhouse-www/assets/timeslotdata.json`;

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        let response = JSON.parse(this.responseText);
        getElements(response);
      }
    }

    request.open("GET", url, true);
    request.send();

    getElements = function(response) {
      // I'm assuming here that the API input is always at least 11 entries, all tomorrow, in ascending chronological order.
      // If any of those assumptions are not always true more code would be needed.
      let hour = [];
      let minute = [];
      let buttontext = '';
      for (let i=0; i < 11; i++) {
        hour.push(parseInt(response['scheduleDays'][0]['timeSlots'][i].slotDateTime.substring(11,13)));
        minute.push(response['scheduleDays'][0]['timeSlots'][i].slotDateTime.substring(14,16));
        if (hour[i] == 0) {
          buttonText = ("12:" + minute[i] + "a");
        } else if (hour[i] < 12) {
          buttonText = (hour[i].toString() + ":" + minute[i] + "a");
        } else if (hour[i] == 12){
          buttonText = ("12:" + minute[i] + "p");
        } else {
          buttonText = ((hour[i]-12).toString() + ":" + minute[i] + "p");
        }
        buttonText = '<button class="schedButton">'+buttonText+'</button>'
        console.log(buttonText);
        $("#schedButton"+i.toString()).append(buttonText);
      }


    }
});
