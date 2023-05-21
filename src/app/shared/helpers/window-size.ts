export function windowInnerWidth() {
const mybreakpoint =
window.innerWidth >= 1200
  ? 4
  : window.innerWidth >= 976
  ? 3
  : window.innerWidth >= 600
  ? 2
  : 1;
  return mybreakpoint;
}


export function handleSize(event: any) {
    const mybreakpoint =
      event.target.innerWidth >= 1200
        ? 4
        : event.target.innerWidth >= 976
        ? 3
        : event.target.innerWidth >= 600
        ? 2
        : 1;
        return mybreakpoint;
  }