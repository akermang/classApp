class UserComponent {
    constructor(user){
      this.user = user;
      this.createElement();
    }
    
    createElement(){
      this.element = $(`
        <div>
          <span class="spn-name">${this.user.name}:</span>
          <span>${this.user.email}</span>
          <p>${this.user.phone}</p>
          <button class="btn-remove">Remove</button>
          <button class="btn-edit">Edit</button>
        </div>
      `);
      
      let removeButton = this.element.find("button.btn-remove");
      let editButton = this.element.find(".btn-edit");

      editButton.on("click", ()=>{
         let inputVale =  prompt(`edit: ${this.user.name}`);
         let editElement = this.element.find(".spn-name");
         editElement.html(inputVale)
      })
      removeButton.on("click", ()=>{
        this.element.remove();
      });
    }
  }
  
  
  
  class UsersListComponent {
    constructor(usersList){
      this.usersList = usersList;
      this.createElement();
    }
    
    createElement(){
      this.element = $(`<ul></ul>`);
      
      for(let user of this.usersList){
        let liEl = $("<li></li>");
        let userComp = new UserComponent(user);
        liEl.append(userComp.element);
        this.element.append(liEl);
      }
    }
  }  
    
  $.get("https://jsonplaceholder.typicode.com/users", function(response){
    let comp = new UsersListComponent(response);
    $("main").append(comp.element);
  })
  
  
  
  