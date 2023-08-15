export default class Forms {
  constructor(forms) {
    this.forms = document.querySelectorAll(forms);
    this.inputs = document.querySelectorAll("input");
    this.message = {
      loading: "loading...",
      success: "thnk u : )",
      error: "smth went wrong",
    };
    this.path = "assets/question.php";
  }
  async postData(url, data) {
    let res = await fetch(url, {
      method: "POST",
      body: data,
    });

    console.log("Получен ответ от сервера:", res);
    return await res.text();
  }
  initMask(){
     let setCursorPosition = (element, position) => {
       element.focus();
       if (element.setSelectionRange) {
         element.setSelectionRange(position, position);
       } else if (element.createTextRange) {
         let range = element.createTextRange();
         range.collapse(true);
         range.moveEnd("character", position);
         range.moveStart("character", position);
         range.select();
       }
     };

     function createMask(event) {
       let matrix = "+1 (___) ___-____",
         iterator = 0,
         def = matrix.replace(/\D/g, ""),
         value = this.value.replace(/\D/g, "");

       if (def.length >= value.length) {
         value = def;
       }

       this.value = matrix.replace(/./g, (a) => {
         return /[_\d]/.test(a) && iterator < value.length
           ? value.charAt(iterator++)
           : iterator >= value.length
           ? ""
           : a;
       });

       if (event.type === "blur") {
         if (this.value.length === 2) {
           this.value = "";
         }
       } else {
         setCursorPosition(this, this.value.length);
       }
     }

     let inputs = document.querySelectorAll('[name = "phone"]');

     inputs.forEach((input) => {
       input.addEventListener("input", createMask);
       input.addEventListener("focus", createMask);
       input.addEventListener("blur", createMask);
     });
  }
  clearInuts() {
    this.inputs.forEach((input) => {
      input.value = "";
    });
  }

  checkMailInputs(){
    const txtInputs = document.querySelectorAll('[type = "email"]');
    txtInputs.forEach((input) => {
      input.addEventListener("input", (e) => {
        const inputValue = e.target.value;
        if (!inputValue.match(/^[а-яё0-9\s]+$/i)) {
          e.target.value = inputValue.replace(/[^a-z 0-9 @ \.]/gi, "");
        }
      });
    });
  };
  
  init() {
    this.initMask()
    this.checkMailInputs()
    this.forms.forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        let statusMessage = document.createElement("div");
        statusMessage.style.cssText = `
          margin-top: 15px;
          font-size: 18px;
          color: grey;
        `;
        form.appendChild(statusMessage);

        statusMessage.textContent = this.message.loading;

        const formData = new FormData(form);

        this.postData(this.path, formData)
          .then((res) => {
            console.log(res);
            statusMessage.textContent = this.message.success;
          })
          .catch(() => {
            statusMessage.textContent = this.message.error;
          })
          .finally(() => {
            this.clearInuts();
            setTimeout(() => {
              statusMessage.remove();
            }, 6000);
          });
      });
    });
  }
}