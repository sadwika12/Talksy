const KeystrokeSounds=[
  new Audio("/sounds/keystroke1.mp3"),
  new Audio("/sounds/keystroke1.mp3"),
  new Audio("/sounds/keystroke1.mp3"),
  new Audio("/sounds/keystroke1.mp3"),
];
function useSounds(){
  const playRandomSound=()=>{
    const randomSound = KeystrokeSounds[Math.floor(Math.random() * KeystrokeSounds.length)];

    randomSound.currentTime = 0; 
    randomSound.play().catch((error) => console.log("Audio play failed:", error));
  }
  return {
    playRandomSound
  };
}
export default useSounds;