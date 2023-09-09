export default function createLoop(clientsRef) {
  if (!clientsRef) return;

  let clientsElem = clientsRef.current;
  
  if (clientsElem) {
    let currentPosition = 0;

    let LOOP = () => {
      if (currentPosition <= -51) currentPosition = -33;
      else currentPosition -= 0.035;

      let translate = `translateX(${currentPosition}%)`;

      clientsElem.style.transform = translate;
    }

    let clientsLoop = setInterval(LOOP, 10);

    clientsElem.addEventListener("mouseover", () => clearInterval(clientsLoop));

    clientsElem.addEventListener("mouseout", () => clientsLoop = setInterval(LOOP, 10));
  }
}