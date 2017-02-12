
var speechText;

da.segment.onpreprocess = function (trigger, args) {
  // Evaluate the launch trigger and args and decide whether to generate a notification.
    console.log('[SpeechToText] onpreprocess', {trigger: trigger, args: args});
    speechText = "";
    da.startSegment(null, null);
    

};

da.segment.onresume = function () {
    console.log('onresume');
    var synthesis = da.SpeechSynthesis.getInstance();
    synthesis.speak('The result is ' + speechText, {
        onstart: function () {
            console.log('[SpeechToText] speak start');
        },
        onend: function () {
            console.log('[SpeechToText] speak onend');
            //if (speechText === "Bye"){
                da.stopSegment();
            //}
            //else{
            //da.startSegment();
        }
            //da.stopSegment();
        },
        onerror: function (error) {
            console.log('[SpeechToText] speak cancel: ' + error.message);
            da.stopSegment();
        }
    });

    if (speechText != "") {
        var entry = {
            domain: "Input Speech Text",
            extension: {},
            title: speechText,
            url: "https://translate.google.co.jp/?hl=ja#en/ja/" + speechText,
            imageUrl: "http://www.sony.net/SonyInfo/News/Press/201603/16-025E/img01.gif",
            date: new Date().toISOString()
        };
        da.addTimeline({entries: [entry]});
    }
};

da.segment.onstart = function (trigger, args) {
    // Implement the onstart process to generate the notification.
    console.log('[SpeechToText] onstart', {trigger: trigger, args: args});
    var synthesis = da.SpeechSynthesis.getInstance();

    if (da.getApiLevel === undefined) {
        // API_LEVEL = 1;
        synthesis.speak('This device software is not available for speech to text function.', {
            onstart: function () {
                console.log('[SpeechToText] speak start');
            },
            onend: function () {
                da.stopSegment();
            },
            onerror: function (error) {
                da.stopSegment();
            }
        });
    } else {
        // API_LEVEL = 2 or later;
        synthesis.speak('Please say something.', {
            onstart: function () {
                console.log('[SpeechToText] speak start');
            },
            onend: function () {
                console.log('[SpeechToText] speak onend');

                var speechToText = new da.SpeechToText();
                speechToText.startSpeechToText(callbackobject);
            },
            onerror: function (error) {
                console.log('[SpeechToText] speak cancel: ' + error.message);
                da.stopSegment();
            }
        });
    }
    
   // Signal that the notification is complete.
    //da.stopSegment();
};




var callbackobject = {
    onsuccess: function (results) {
        console.log('[SpeechToText] : SpeechToText process has finished successfully');
        console.log('[SpeechToText] : Results = ' + results);

        var strResults = results.join(" ");
        speechText = strResults;

        //Translate api


    },
    onerror: function (error) {
        console.log('[SpeechToText] : SpeechToText error message = ' + error.message)
        console.log('[SpeechToText] : SpeechToText error code = ' + error.code)

        var synthesis = da.SpeechSynthesis.getInstance();
        synthesis.speak('The speech to text API could not recognize what you said. Reason is ' + error.message, {
            onstart: function () {
                console.log('[SpeechToText] error message speak start');
            },
            onend: function () {
                console.log('[SpeechToText] error message speak onend');
                da.stopSegment();
            },
            onerror: function (error) {
                console.log('[SpeechToText] error message speak cancel: ' + error.message);
                da.stopSegment();
            }
        });
    }