export function useModal() {
  let stack = [];
  
  let register = (modal) => {
    stack.push(modal);
    return true;
  }

  let close = () => {
    let modal = stack.pop();

    if (modal) {
      modal.isOpen.value = false;
      return true;
    }
    else {
      return false;
    }
  }

  return {
    register,
    close
  }
}