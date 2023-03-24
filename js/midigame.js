var whiteKeys = [1,3,4,6,8,9,11,13,15,16,18,20,21,23,25,27,28,30,32,33,35,37,39,40,
    42,44,45,47,49,51,52,54,56,57,59,61,63,64,66,68,69,71,73,75,76,78,80,81,83,85,87,88];
var blackKeys = [2,5,7,10,12,14,17,19,22,24,26,29,31,34,36,38,41,43,46,48,50,53,55,
    58,60,62,65,67,70,72,74,77,79,82,84,86];
var nameKeys = ["A0","A0-","B0","C1","C1-","D1","D1-","E1","F1","F1-","G1","G1-","A1","A1-","B1",
"C2","C2-","D2","D2-","E2","F2","F2-","G2","G2-","A2","A2-","B2",
"C3","C3-","D3","D3-","E3","F3","F3-","G3","G3-","A3","A3-","B3",
"C4","C4-","D4","D4-","E4","F4","F4-","G4","G4-","A4","A4-","B4",
"C5","C5-","D5","D5-","E5","F5","F5-","G5","G5-","A5","A5-","B5",
"C6","C6-","D6","D6-","E6","F6","F6-","G6","G6-","A6","A6-","B6",
"C7","C7-","D7","D7-","E7","F7","F7-","G7","G7-","A7","A7-","B7","C8"];
var actualBlackKeyCode = ["1","2","3","4","5","6","7","8","9","0","-","=","q","w","e","r","t",
    "y","u","i","o","p","[","]","a","s","d","f","g","h","j","k","l",";","'","z","x","c","v","b",
    "n","m",".","/","!","@","#","$","%","^","&","*"];
var actualBlackKeyCode = ["Q","W","E","R","T","Y","U","I","O","P","A","S","D","F","G","H","J",
    "K","L","Z","X","C","V","B","N","M","(",")","+","{","}",":","<",">","?","~"]
var gamesong = [
    ['110,1,0,0,1','C4,C4,G4,G4,A4,A4,G4,.,F4,F4,E4,E4,D4,D4,C4,.,G4,G4,F4,F4,E4,E4,D4,.,G4,G4,F4,F4,E4,E4,D4,.,C4,C4,G4,G4,A4,A4,G4,.,F4,F4,E4,E4,D4,D4,C4,.'],
    ['180,1,0,0,1','G5,.,E5,F5,G5,.,E5,F5,G5,G4,A4,B4,C5,D5,E5,F5,E5,.,C5,D5,E5,.,E4,F4,G4,A4,G4,F4,G4,E4,F4,G4,F4,.,A4,G4,F4,.,E4,D4,E4,D4,C4,D4,E4,F4,G4,A4,F4,.,A4,G4,A4,.,B4,C5,G4,A4,B4,C5,D5,E5,F5,G5,E5,.,C5,D5,E5,.,D5,C5,D5,B4,C5,D5,E5,D5,C5,B4,C5,.,A4,B4,C5,.,C4,D4,E4,F4,E4,D4,E4,C5,B4,C5,A4,.,C5,B4,A4,.,G4,F4,G4,F4,E4,F4,G4,A4,B4,C5,A4,.,C5,B4,C5,.,B4,A4,B4,C5,D5,C5,B4,C5,A4,B4']
];
//velocity delay channel now notelong
function returnData(note,channel,currentTime,endTime,message,velocity,delay,notelong){
    var gamesongdata = {
        note: note,
        channel: channel,
        now: currentTime,
        end: endTime,
        message: message,
        velocity: velocity,
        delay: delay,
        notelong: notelong
    }
    return gamesongdata;
}
