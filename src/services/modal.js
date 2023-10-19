export function useModal() {
  let stack = [];
  
  let register = (isOpen) => {
    stack.push(isOpen);
    return true;
  }

  let close = () => {
    let isOpen = stack.pop();

    if (isOpen) {
      isOpen.value = false;
      return true;
    }
  }

  return {
    register,
    close
  }
}