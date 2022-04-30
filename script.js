//Variables
const terminal = document.getElementById("terminal");
const terminalText = document.getElementById("terminalText");
const terminalPrefix = document.getElementById("terminalPrefix");
const terminalInput = document.getElementById("terminalInput");
const matrix = document.getElementById("matrix");
const terminalDatabase = [];
if(sessionStorage.getItem("priorCommand") == null) {
    let priorCommand = [];
    sessionStorage.setItem("priorCommand", JSON.stringify(priorCommand));
}
const scrollingElement = (document.scrollingElement || document.body)

//Load Terminal
function loadTerminal() {
    terminalDatabase.push("Zhifty Terminal");
    terminalDatabase.push("The first client side terminal ever!");
    terminalDatabase.push("Write 'help' for a list of commands");
    terminalDatabase.push("");
    const formatTerminalDatabase = terminalDatabase + "";
    const formattedTerminalDatabase = formatTerminalDatabase.split(",").join("<br>");
    terminalText.innerHTML = formattedTerminalDatabase;
    terminalPrefix.style.color = sessionStorage.getItem("color");
    terminalInput.style.color = sessionStorage.getItem("color");
    terminalText.style.color = sessionStorage.getItem("color");
    if(sessionStorage.getItem("matrix") == "true") {
        document.body.style.padding = "0px";
        document.body.style.margin = "0px";
        matrix.style.display = "block";
        terminal.style.display = "none";
        sessionStorage.removeItem("matrix");
        document.body.addEventListener("keyup", function(event) {
            if(event.keyCode === 13 || event.keyCode === 32) {
                location.reload();
            }
        });
    }
}
window.onload = loadTerminal;

//Get ipAddress
let publicIpAddress;
let localIpAddress;
fetch("https://api.ipify.org/?format=json")
.then(response => response.json())
.then(data => {
    publicIpAddress = data.ip;
});

var RTCPeerConnection = /*window.RTCPeerConnection ||*/ window.webkitRTCPeerConnection || window.mozRTCPeerConnection;  
if (RTCPeerConnection)(function() {  
    var rtc = new RTCPeerConnection({  
        iceServers: []
    });  
    if (1 || window.mozRTCPeerConnection) {  
        rtc.createDataChannel('', {  
            reliable: false  
        });  
    };  
    rtc.onicecandidate = function(evt) {  
        if (evt.candidate) grepSDP("a=" + evt.candidate.candidate);  
    };  
    rtc.createOffer(function(offerDesc) {  
        grepSDP(offerDesc.sdp);  
        rtc.setLocalDescription(offerDesc);  
    }, function(e) {  
        console.warn("offer failed", e);  
    });  
    var addrs = Object.create(null);  
    addrs["0.0.0.0"] = false;  

    function updateDisplay(newAddr) {  
        if (newAddr in addrs) return;  
        else addrs[newAddr] = true;  
        var displayAddrs = Object.keys(addrs).filter(function(k) {  
            return addrs[k];  
        });  
        localIpAddress = displayAddrs.join(" or perhaps ") || "n/a";  
    }  

    function grepSDP(sdp) {  
        var hosts = [];  
        sdp.split('\r\n').forEach(function(line) {  
            if (~line.indexOf("a=candidate")) {  
                var parts = line.split(' '),  
                    addr = parts[4],  
                    type = parts[7];  
                if (type === 'host') updateDisplay(addr);  
            } else if (~line.indexOf("c=")) {  
                var parts = line.split(' '),  
                    addr = parts[2];  
                updateDisplay(addr);  
            }  
        });  
    }  
})();
else {  
    document.getElementById('list').innerHTML = "<code>ifconfig| grep inet | grep -v inet6 | cut -d\" \" -f2 | tail -n1</code>";  
    document.getElementById('list').nextSibling.textContent = "In Chrome and Firefox your IP should display automatically, by the power of WebRTCskull.";  
}

//Focus Terminal
setInterval(() => {
    terminalInput.focus();
});

let priorCommandState = JSON.parse(sessionStorage.getItem("priorCommand")).length;
//PriorCommand Handler
terminalInput.addEventListener("keyup", function(event) {
    let tmp = JSON.parse(sessionStorage.getItem("priorCommand"));
    if (event.keyCode === 38) {
        event.preventDefault();
        priorCommandState = priorCommandState - 1;
        terminalInput.value = tmp[priorCommandState];
        if(tmp[priorCommandState] == undefined){
            priorCommandState = priorCommandState + 1;
            terminalInput.value = tmp[priorCommandState];
            if(tmp.length === 0){
                terminalInput.value = "";
            }
        }
    } 
    else if(event.keyCode === 40) {
        event.preventDefault();
        priorCommandState = priorCommandState + 1;
        terminalInput.value = tmp[priorCommandState];
        if(tmp[priorCommandState] == undefined){
            priorCommandState = priorCommandState - 1;
            terminalInput.value = "";
        }
    }
});

//Terminal Handler
terminalInput.addEventListener("keyup", function(event) {
    if (event.keyCode === 13 && terminalInput.value !== "") {
        event.preventDefault();
        let javascriptCode = "";

        //Terminal Commands
        if(terminalInput.value == "help") { //list of commands
            terminalDatabase.push("$ " + terminalInput.value);
            terminalDatabase.push("Zterm Commands...");
            terminalDatabase.push("");
            terminalDatabase.push("version | Shows the version of Zterm youre running");
            terminalDatabase.push("");
            terminalDatabase.push("clear | Clears/resets the terminal");
            terminalDatabase.push("");
            terminalDatabase.push("start www.example.com | Start/open any webpage/url")
            terminalDatabase.push("");
            terminalDatabase.push("ping www.example.com | Ping any website to check the response time");
            terminalDatabase.push("");
            terminalDatabase.push("lookup 88.888.888.88 | Lookup any IP adress");
            terminalDatabase.push("");
            terminalDatabase.push("color limegreen | Change color to anything you would like");
            terminalDatabase.push("");
            terminalDatabase.push("ipconfig | Get you're IP adress");
            terminalDatabase.push("");
            terminalDatabase.push("matrix | Display the matrix");
            terminalDatabase.push("");
            terminalDatabase.push("echo text | Display any message");
            terminalDatabase.push("");
            terminalDatabase.push("calc 5 + 5 | Built in calculator");
            terminalDatabase.push("");
            terminalDatabase.push("run alert('text') | Run native javascript code");
            terminalDatabase.push("");
            terminalDatabase.push("nrplt AB12345 | Check any Danish numberplate");
            terminalDatabase.push("");
            terminalDatabase.push("exerunner.create C:\\GAMEPATH | Create Aka. register any executable for exerunner");
            terminalDatabase.push("");
            terminalDatabase.push("exerunner.launch GAMENAME | Launch any exerunner registered executeable");
            terminalDatabase.push("");
            terminalDatabase.push("exerunner.registry | List of all exerunner registered executables");
            terminalDatabase.push("");
            terminalDatabase.push("exerunner.clear | Clear list of all exerunner registered executables");
            terminalDatabase.push("");
            terminalDatabase.push("balance H2O = H + O | Balance chemical equations");
            terminalDatabase.push("");
            pushCommand();
        }
        else if(terminalInput.value == "version") { //shows version information
            terminalDatabase.push("$ " + terminalInput.value);
            terminalDatabase.push("You are running Zhifty Terminal version 0.9");
            terminalDatabase.push("");
            pushCommand();
        } 
        else if(terminalInput.value == "clear") { //clears the terminal
            location.reload();
        }
        else if(terminalInput.value.endsWith("start") || terminalInput.value.startsWith("start") && terminalInput.value.endsWith(" ")){
            terminalDatabase.push("$ " + terminalInput.value);
            terminalDatabase.push('You need to enter a website url after "start"');
            terminalDatabase.push("");
            pushCommand();
        }
        else if(terminalInput.value.includes("start ")) { //starts any website
            terminalDatabase.push("$ " + terminalInput.value);
            const startLink = "https://" + terminalInput.value.replace(/start /g, "") 
            terminalDatabase.push("You started " + startLink);
            terminalDatabase.push("");
            window.open(startLink, "_blank");
            pushCommand();
        }
        else if(terminalInput.value.endsWith("ping") || terminalInput.value.startsWith("ping") && terminalInput.value.endsWith(" ")){
            terminalDatabase.push("$ " + terminalInput.value);
            terminalDatabase.push('You need to enter a website url after "ping"');
            terminalDatabase.push("");
            pushCommand();
        }
        else if(terminalInput.value.includes("ping ")) { //pings any website
            terminalDatabase.push("$ " + terminalInput.value);
            const pingLink = terminalInput.value.replace(/ping /g, "")
            terminalDatabase.push("Pinging https://" + pingLink + "...");
            terminalDatabase.push("");

            $.ajaxSetup({ cache: false });
            $( document ).ready(function() {
                var start = new Date().getTime();
                $('#junkOne').on('error', function (e) {
                    var end = new Date().getTime();
                    $("#timer").html("" + (end-start) + "ms");
                    setTimeout(() => {
                        terminalDatabase.push(document.getElementById("timer").innerHTML)
                        terminalDatabase.push("");
                        pushCommand();
                        terminalPrefix.style.display = "inline";
                        terminalInput.style.display = "inline";
                    }, end-start+1000);
                }).attr('src', 'http://' + pingLink + '/latency.jpg?d=' + new Date().getTime());
            });
            terminalPrefix.style.display = "none";
            terminalInput.style.display = "none";
            pushCommand();
        }
        else if(terminalInput.value.endsWith("lookup") || terminalInput.value.startsWith("lookup") && terminalInput.value.endsWith(" ")){
            terminalDatabase.push("$ " + terminalInput.value);
            terminalDatabase.push('You need to enter an IP adress after "lookup"');
            terminalDatabase.push("");
            pushCommand();
        }
        else if(terminalInput.value.includes("lookup ")) { //get location of ip adress
            terminalDatabase.push("$ " + terminalInput.value);
            const iplookup = terminalInput.value.replace(/lookup /g, "")
            terminalDatabase.push("Looking up " + iplookup + "...");
            terminalDatabase.push("");
            fetch("https://ip-api.com/json/" + iplookup)
            .then(response => response.json())
            .then(data => {
                terminalDatabase.push("Status: " + data.status);
                terminalDatabase.push("Isp: " + data.isp);
                terminalDatabase.push("Org: " + data.org);
                terminalDatabase.push("City: " + data.city);
                terminalDatabase.push("Country: " + data.country + `(${data.countryCode})`);
                terminalDatabase.push("Timezone: " + data.timezone);
                terminalDatabase.push("Region: " + data.region);
                terminalDatabase.push("RegionName: " + data.regionName);
                terminalDatabase.push("Latitude: " + data.lat);
                terminalDatabase.push("Longitude: " + data.lon);
                terminalDatabase.push("Zip: " + data.zip);
                terminalDatabase.push("");
                pushCommand();
            });
        }
        else if(terminalInput.value.endsWith("color") || terminalInput.value.startsWith("color") && terminalInput.value.endsWith(" ")){
            terminalDatabase.push("$ " + terminalInput.value);
            terminalDatabase.push('You need to define a color after "color"');
            terminalDatabase.push("");
            pushCommand();
        }
        else if(terminalInput.value.includes("color ")) { //change text color
            terminalDatabase.push("$ " + terminalInput.value);
            const colorType = terminalInput.value.replace(/color /g, "");
            terminalDatabase.push("Changed color to " + colorType + "...");
            terminalDatabase.push("");
            terminalPrefix.style.color = colorType;
            terminalInput.style.color = colorType;
            terminalText.style.color = colorType;
            sessionStorage.setItem("color", colorType);
            pushCommand();
        }
        else if(terminalInput.value.includes("ipconfig")) { //get ip address
            terminalDatabase.push("$ " + terminalInput.value);
            terminalDatabase.push("Public IPv4: " + publicIpAddress);
            terminalDatabase.push("Local IPv4: " + localIpAddress);
            terminalDatabase.push("");
            pushCommand();
        }
        else if(terminalInput.value.includes("matrix")) { //launch the matrix
            terminalDatabase.push("$ " + terminalInput.value);
            terminalDatabase.push("Launching the matrix...");
            terminalDatabase.push("");
            terminalPrefix.style.display = "none";
            terminalInput.style.display = "none";
            sessionStorage.setItem("matrix", "true");
            setInterval(() => {
                location.reload();
            }, 3000);
            pushCommand();
        }
        else if(terminalInput.value.endsWith("echo") || terminalInput.value.startsWith("echo") && terminalInput.value.endsWith(" ")){
            terminalDatabase.push("$ " + terminalInput.value);
            terminalDatabase.push('You need to define a message after "echo"');
            terminalDatabase.push("");
            pushCommand();
        }
        else if(terminalInput.value.includes("echo ")) { //Echoing any message
            terminalDatabase.push("$ " + terminalInput.value);
            const echoMsg = terminalInput.value.replace(/echo /g, "");
            terminalDatabase.push(echoMsg);
            terminalDatabase.push("");
            pushCommand();
        }
        else if(terminalInput.value.includes("calc ")) { //basic calculator
            const calcString = terminalInput.value.replace(/calc /g, "")
            const fixedCalcString = calcString.replace(/,/g, ".")
            terminalDatabase.push("$ " + "calc " + fixedCalcString);
            terminalDatabase.push(fixedCalcString + " = " + eval(fixedCalcString));
            terminalDatabase.push("");
            pushCommand();
        }
        else if(terminalInput.value.endsWith("calc")){
            terminalDatabase.push("$ " + terminalInput.value);
            terminalDatabase.push('You need to enter numbers after "calc"');
            terminalDatabase.push("");
            pushCommand();
        }
        else if(terminalInput.value.includes("run ")) { //run javascript code
            const javascriptString = terminalInput.value.replace(/run /g, "")
            const fixedJavascriptString = javascriptString.replace(/,/g, ".")
            terminalDatabase.push("$ " + "run " + fixedJavascriptString);
            terminalDatabase.push("");
            sessionStorage.setItem("runJsCode", "run");
            javascriptCode = new Function (javascriptString);
            pushCommand();
        }
        else if(terminalInput.value.endsWith("run")){
            terminalDatabase.push("$ " + terminalInput.value);
            terminalDatabase.push('You need to define any sort of native js after "run"');
            terminalDatabase.push("");
            pushCommand();
        }
        else if(terminalInput.value.includes("nrplt ")) { //Lookup any danish numberplate
            terminalDatabase.push("$ " + terminalInput.value);
            const nrplt = terminalInput.value.replace(/nrplt /g, "")
            terminalDatabase.push("Checking numberplate " + nrplt + "...");
            terminalDatabase.push("");
            pushCommand();
            fetch('https://e0bc-80-208-65-225.ngrok.io/?q=' + nrplt)
            .then(response => response.json())
            .then(data => {
                terminalDatabase.push("Brand: " + data.mærke.replace(",", "."));
                terminalDatabase.push("Model: " + data.model.replace(",", "."));
                terminalDatabase.push("Variant: " + data.variant.replace(",", "."));
                terminalDatabase.push("Type: " + data.type.replace(",", "."));
                terminalDatabase.push("Purpose: " + data.anvendelse.replace(",", "."));
                terminalDatabase.push("Numberplate: " + data.nummerplade.replace(",", "."));
                terminalDatabase.push("ChassisNumber: " + data.stelnr.replace(",", "."));
                terminalDatabase.push("Link: <a style='padding: 0px; margin: 0px;' href='https://www.nummerplade.net/nummerplade/" + nrplt + ".html'>https://www.nummerplade.net/</a>");
                terminalDatabase.push("");
                pushCommand();                
            });
        }
        else if(terminalInput.value.endsWith("nrplt" || "nrplt ")){
            terminalDatabase.push("$ " + terminalInput.value);
            terminalDatabase.push('You need to define the plate numbers after "nrplt"');
            terminalDatabase.push("");
            pushCommand();
        }
        else if(terminalInput.value.endsWith("exerunner.create") || terminalInput.value.startsWith("exerunner.create") && terminalInput.value.endsWith(" ")){
            terminalDatabase.push("$ " + terminalInput.value);
            terminalDatabase.push('You need to define the executables path after "exerunner.create"');
            terminalDatabase.push("");
            pushCommand();
        }
        else if(terminalInput.value.includes("exerunner.create ")) { //Create AKA. register any executable for exerunner
            terminalDatabase.push("$ " + terminalInput.value);
            const path = terminalInput.value.replace(/exerunner.create /g, "");
            const fixedPath = path.replace(/\\/g, "\\\\");
            const fixedName = fixedPath.split("\\").pop().replace(".exe", "").toLowerCase().replace(" ", "");

            const text = '@echo off\nset Name=' + fixedName + '\n(\necho Windows Registry Editor Version 5.00\necho.\necho [HKEY_CLASSES_ROOT\\%Name%]\necho "URL Protocol"=""\necho [HKEY_CLASSES_ROOT\\%Name%\\shell]\necho [HKEY_CLASSES_ROOT\\%Name%\\shell\\open]\necho [HKEY_CLASSES_ROOT\\%Name%\\shell\\open\\command]\necho @="' + fixedPath + '"\n) > %Name%.reg\nregedit /s %cd%\\%Name%.reg'
            const element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            element.setAttribute('download', "ExeRunner " + fixedName + ".bat");

            const prevLS = localStorage.getItem("exerunner");
            if(prevLS != "null"){
                localStorage.setItem("exerunner", prevLS + ", " + fixedName);
            }
            else {
                localStorage.setItem("exerunner", fixedName);
            }
            
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);

            terminalDatabase.push('Executable runner file "' + fixedName + '" is created!');
            terminalDatabase.push("");
            pushCommand();
        }
        else if(terminalInput.value.includes("exerunner.launch ")) { //Launch any exerunner registered executeable
            terminalDatabase.push("$ " + terminalInput.value);
            const prgmName = terminalInput.value.replace(/exerunner.launch /g, "");
            terminalDatabase.push("Launching " + prgmName + "...");
            terminalDatabase.push("");
            pushCommand();

            setTimeout(() => {
                window.open(prgmName + ":", "_self");
            }, 2000);
        }
        else if(terminalInput.value.endsWith("exerunner.launch")){
            terminalDatabase.push("$ " + terminalInput.value);
            terminalDatabase.push('You need to define one of the registered executable names after "exerunner.launch"');
            terminalDatabase.push('You can find a list of registered executables by using "exerunner.registry"')
            terminalDatabase.push("");
            pushCommand();
        }
        else if(terminalInput.value.includes("exerunner.registry")) { //List of all exerunner registered executables
            terminalDatabase.push("$ " + terminalInput.value);
            const echoMsg = terminalInput.value.replace(/echo /g, "");
            if(localStorage.getItem("exerunner") != "null"){
                terminalDatabase.push(localStorage.getItem("exerunner"));
            }
            else {
                terminalDatabase.push("There is no registered exerunner executables!");
            }
            terminalDatabase.push("");
            pushCommand();
        }
        else if(terminalInput.value.includes("exerunner.clear")) { //Clear list of all exerunner registered executables
            terminalDatabase.push("$ " + terminalInput.value);
            localStorage.setItem("exerunner", "null")
            terminalDatabase.push("Exerunner registry is cleared!");
            terminalDatabase.push("");
            pushCommand();
        }
        else if(terminalInput.value.includes("balance ")) { //Clear list of all exerunner registered executables
            terminalDatabase.push("$ " + terminalInput.value);
            const equation = terminalInput.value.replace("balance ", "")
            formulaStr = equation;
            doBalance();
            terminalDatabase.push(`<p class="balanceOutputClass">${document.getElementById("balanced").innerHTML}</p>`)
            pushCommand();
        }
        else {
            pushNoncommand();
        }
        
        //Terminal DB Push
        function pushCommand() {
            addPriorCommand();
            const formatTerminalDatabase = terminalDatabase + "";
            const formattedTerminalDatabase = formatTerminalDatabase.split(",").join("<br>");
            terminalText.innerHTML = formattedTerminalDatabase;
            let tmp = JSON.parse(sessionStorage.getItem("priorCommand"));
            priorCommandState = tmp.length;
            if(sessionStorage.getItem("runJsCode") != null){
                javascriptCode();
                sessionStorage.removeItem("runJsCode");
            }
        }

        function pushNoncommand() {
            terminalDatabase.push("$ " + terminalInput.value);
            terminalDatabase.push("'" + terminalInput.value + "' is not recognized as an internal command");
            terminalDatabase.push("");
            const formatTerminalDatabase = terminalDatabase + "";
            const formattedTerminalDatabase = formatTerminalDatabase.split(",").join("<br>");
            terminalText.innerHTML = formattedTerminalDatabase;
        }

        function addPriorCommand() {
            let tmp = JSON.parse(sessionStorage.getItem("priorCommand"));
            if (terminalInput.value != "") {
                tmp = tmp.filter(e => e !== terminalInput.value);
                tmp.push(terminalInput.value);
                sessionStorage.setItem("priorCommand", JSON.stringify(tmp));
            }
        }
        
        terminalInput.value = "";
        setTimeout(() => {
            scrollingElement.scrollTop = scrollingElement.scrollHeight;
        }, 100);
    }
});