console.log("I'm Kaneko");
var capture = new Vue({
    el: '#lga',
    data: {
        message: 'Hello Vue!'
    },
    methods: {
        capture() {
            console.log("Capture");
            let vm = this;
             navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            }).then(async function(stream) {
                vm.$refs.video.srcObject = stream;
                let recorder = RecordRTC(stream, {
                    type: 'video/webm;codecs=h264'
                });
                recorder.startRecording();
            
                const sleep = m => new Promise(r => setTimeout(r, m));
                await sleep(5000);
            
                recorder.stopRecording(function() {
                    let blob = recorder.getBlob();
                    invokeSaveAsDialog(blob);
                });
            });
        }
    },
    template: `
    <div>
        <button @click="capture">Capture</button>
        <video ref="video" controls autoplay playsinline></video>
    </div>
    `
})