document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const sipUriInput = document.getElementById('sipUri');
    const passwordInput = document.getElementById('password');
    const wsServerInput = document.getElementById('wsServer');
    const connectBtn = document.getElementById('connectBtn');
    const disconnectBtn = document.getElementById('disconnectBtn');
    const callToInput = document.getElementById('callTo');
    const callBtn = document.getElementById('callBtn');
    const statusDiv = document.getElementById('status');
    const callControls = document.getElementById('callControls');
    const answerBtn = document.getElementById('answerBtn');
    const hangupBtn = document.getElementById('hangupBtn');
    const muteBtn = document.getElementById('muteBtn');
    const holdBtn = document.getElementById('holdBtn');
    const localVideo = document.getElementById('localVideo');
    const remoteVideo = document.getElementById('remoteVideo');
    const logDiv = document.getElementById('log');

    let ua;
    let currentSession;
    let isMuted = false;
    let isHeld = false;

    // Add log message
    function addLog(message) {
        const logEntry = document.createElement('div');
        logEntry.textContent = message;
        logDiv.appendChild(logEntry);
        logDiv.scrollTop = logDiv.scrollHeight;
    }

    // Initialize JsSIP
    function initSIP() {
        const sipUri = sipUriInput.value.trim();
        const password = passwordInput.value;
        const wsServer = wsServerInput.value.trim();

        if (!sipUri || !password || !wsServer) {
            alert('Please fill in all fields');
            return;
        }

        // JsSIP configuration
        const configuration = {
            sockets: [new JsSIP.WebSocketInterface(wsServer)],
            uri: sipUri,
            password: password,
            session_timers: false,
            register: true,
            register_expires: 600,
            connection_recovery_min_interval: 2,
            connection_recovery_max_interval: 30,
            // Add your STUN/TURN servers if needed
            // pcConfig: {
            //     iceServers: [
            //         { urls: ['stun:stun.l.google.com:19302'] }
            //     ]
            // }
        };

        ua = new JsSIP.UA(configuration);

        // Event handlers
        ua.on('connecting', () => {
            statusDiv.textContent = 'Connecting...';
            statusDiv.style.backgroundColor = '#fff3cd';
            addLog('Connecting to SIP server...');
        });

        ua.on('connected', () => {
            statusDiv.textContent = 'Connected';
            statusDiv.style.backgroundColor = '#d4edda';
            addLog('Connected to SIP server');

            connectBtn.disabled = true;
            disconnectBtn.disabled = false;
            callToInput.disabled = false;
            callBtn.disabled = false;
        });

        ua.on('disconnected', () => {
            statusDiv.textContent = 'Disconnected';
            statusDiv.style.backgroundColor = '#f8d7da';
            addLog('Disconnected from SIP server');

            connectBtn.disabled = false;
            disconnectBtn.disabled = true;
            callToInput.disabled = true;
            callBtn.disabled = true;
            callControls.style.display = 'none';
        });

        ua.on('registered', () => {
            addLog('Successfully registered');
        });

        ua.on('unregistered', () => {
            addLog('Unregistered');
        });

        ua.on('registrationFailed', (data) => {
            addLog(`Registration failed: ${data.cause}`);
        });

        ua.on('newRTCSession', (data) => {
            const session = data.session;

            if (session.direction === 'incoming') {
                addLog(`Incoming call from ${session.remote_identity.display_name || session.remote_identity.uri.user}`);

                currentSession = session;
                callControls.style.display = 'flex';
                answerBtn.disabled = false;
                hangupBtn.disabled = false;

                // Auto-answer for demo purposes (remove in production)
                // setTimeout(() => {
                //     answerCall();
                // }, 2000);
            }

            session.on('progress', () => {
                addLog('Call is progressing...');
            });

            session.on('failed', () => {
                addLog('Call failed');
                endCall();
            });

            session.on('ended', () => {
                addLog('Call ended');
                endCall();
            });

            session.on('confirmed', () => {
                addLog('Call confirmed');
            });

            session.on('addstream', (stream) => {
                addLog('Stream added');
                remoteVideo.srcObject = stream.stream;
            });

            session.on('peerconnection', (pc) => {
                pc.onaddstream = (event) => {
                    remoteVideo.srcObject = event.stream;
                };
            });
        });

        // Start the SIP client
        ua.start();
    }

    // Disconnect from SIP server
    function disconnectSIP() {
        if (ua) {
            ua.stop();
            ua = null;
        }
    }

    // Make a call
    function makeCall() {
        const target = callToInput.value.trim();

        if (!target) {
            alert('Please enter a SIP URI to call');
            return;
        }

        if (!ua) {
            alert('Not connected to SIP server');
            return;
        }

        const options = {
            mediaConstraints: { audio: true, video: true },
            pcConfig: {
                iceServers: [
                    { urls: ['stun:stun.l.google.com:19302'] }
                ]
            },
            rtcOfferConstraints: { offerToReceiveAudio: true, offerToReceiveVideo: true }
        };

        currentSession = ua.call(target, options);

        if (currentSession) {
            callControls.style.display = 'flex';
            answerBtn.disabled = true;
            hangupBtn.disabled = false;

            currentSession.on('peerconnection', (pc) => {
                pc.onaddstream = (event) => {
                    if (event.stream.getVideoTracks().length > 0) {
                        remoteVideo.srcObject = event.stream;
                    }
                };

                pc.getLocalStreams().forEach(stream => {
                    if (stream.getVideoTracks().length > 0) {
                        localVideo.srcObject = stream;
                    }
                });
            });

            addLog(`Calling ${target}`);
        }
    }

    // Answer incoming call
    function answerCall() {
        if (currentSession) {
            const options = {
                mediaConstraints: { audio: true, video: true },
                pcConfig: {
                    iceServers: [
                        { urls: ['stun:stun.l.google.com:19302'] }
                    ]
                }
            };

            currentSession.answer(options);
            answerBtn.disabled = true;

            currentSession.on('peerconnection', (pc) => {
                pc.getLocalStreams().forEach(stream => {
                    if (stream.getVideoTracks().length > 0) {
                        localVideo.srcObject = stream;
                    }
                });
            });

            addLog('Call answered');
        }
    }

    // End current call
    function endCall() {
        if (currentSession) {
            currentSession.terminate();
            currentSession = null;
        }

        callControls.style.display = 'none';
        remoteVideo.srcObject = null;
    }

    // Toggle mute
    function toggleMute() {
        if (currentSession) {
            if (isMuted) {
                currentSession.unmute();
                muteBtn.textContent = 'Mute';
                addLog('Microphone unmuted');
            } else {
                currentSession.mute();
                muteBtn.textContent = 'Unmute';
                addLog('Microphone muted');
            }
            isMuted = !isMuted;
        }
    }

    // Toggle hold
    function toggleHold() {
        if (currentSession) {
            if (isHeld) {
                currentSession.unhold();
                holdBtn.textContent = 'Hold';
                addLog('Call resumed');
            } else {
                currentSession.hold();
                holdBtn.textContent = 'Resume';
                addLog('Call on hold');
            }
            isHeld = !isHeld;
        }
    }

    // Event listeners
    connectBtn.addEventListener('click', initSIP);
    disconnectBtn.addEventListener('click', disconnectSIP);
    callBtn.addEventListener('click', makeCall);
    answerBtn.addEventListener('click', answerCall);
    hangupBtn.addEventListener('click', endCall);
    muteBtn.addEventListener('click', toggleMute);
    holdBtn.addEventListener('click', toggleHold);
});
