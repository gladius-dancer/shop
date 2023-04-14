import { toast } from "react-toastify";

export class Notification {
  properties: any;

  constructor(){
    this.properties = {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored"
    }
  }

  showSuccess(message){
    return toast.success(message, this.properties)
  }

  showInfo(message){
    return toast.info(message, this.properties)
  }

  showError(message){
    return toast.error(message, this.properties)
  }
}
