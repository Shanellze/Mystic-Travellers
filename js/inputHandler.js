class InputHandler {
    constructor(player) {
      this.player = player;
      this.lastKey = '';
      this.keys = {
        ArrowUp: { pressed: false },
        ArrowDown: { pressed: false },
        ArrowRight: { pressed: false },
        ArrowLeft: { pressed: false },
        Enter: { pressed: false },
        Backspace: { pressed: false },
      };
  
      window.addEventListener('keydown', this.handleKeyDown.bind(this));
      window.addEventListener('keyup', this.handleKeyUp.bind(this));
    }
  
    //when the key is pressed
    handleKeyDown(e) {
      switch (e.key) {
        case 'ArrowUp':
          this.keys.ArrowUp.pressed = true;
          this.lastKey = 'ArrowUp';
          this.player.isMoving = true;
          break;
        case 'ArrowDown':
          this.keys.ArrowDown.pressed = true;
          this.lastKey = 'ArrowDown';
          this.player.isMoving = true;
          break;
        case 'ArrowRight':
          this.keys.ArrowRight.pressed = true;
          this.lastKey = 'ArrowRight';
          this.player.isMoving = true;
          break;
        case 'ArrowLeft':
          this.keys.ArrowLeft.pressed = true;
          this.lastKey = 'ArrowLeft';
          this.player.isMoving = true;
          break;
        case 'Enter':
          this.keys.Enter.pressed = true;
          this.lastKey = 'Enter';
          break;
        case 'Backspace':
          this.keys.Backspace.pressed = true;
          this.lastKey = 'Backspace';
          break;
      }
    }
  
    //when the key is released
    handleKeyUp(e) {
      switch (e.key) {
        case 'ArrowUp':
          this.keys.ArrowUp.pressed = false;
          this.player.isMoving = false;
          break;
        case 'ArrowDown':
          this.keys.ArrowDown.pressed = false;
          this.player.isMoving = false;
          break;
        case 'ArrowRight':
          this.keys.ArrowRight.pressed = false;
          this.player.isMoving = false;
          break;
        case 'ArrowLeft':
          this.keys.ArrowLeft.pressed = false;
          this.player.isMoving = false;
          break;
        case 'Enter':
          this.keys.Enter.pressed = false;
          break;
        case 'Backspace':
          this.keys.Backspace.pressed = false;
          break;
      }
    }
  }
  
  export default InputHandler;