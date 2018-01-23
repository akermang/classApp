class UserComponent {
  constructor(user) {
    this.user = user;
    this.createElement();
    this.onRemove = () => {};
  }

  createElement() {
    this.element = $(`
        <div>
          <p class="spn-name">${this.user.name}</p>
          <p>${this.user.email}</p>
          <p>${this.user.phone}</p>
          <button class="btn-remove">Remove</button>
          <button class="btn-edit">Edit</button>
        </div>
      `);

    let removeButton = this.element.find("button.btn-remove");
    let editButton = this.element.find(".btn-edit");

    editButton.on("click", () => {
      let inputVale = prompt(`edit: ${this.user.name}`);
      let editElement = this.element.find(".spn-name");
      editElement.html(inputVale);
    });
    removeButton.on("click", () => {
      this.onRemove();
    });
  }
}

class UsersListComponent {
  constructor(usersList) {
    this.usersList = usersList;
    this.createElement();
  }

  createElement() {
    this.element = $(`<ul></ul>`);

    for (let user of this.usersList) {
      let liEl = $("<li></li>");
      let userComp = new UserComponent(user);
      userComp.onRemove = () => liEl.remove();
      let addressComp = new AddressComponent(user.address);
      liEl.append(userComp.element);
      liEl.append(addressComp.element);
      this.element.append(liEl);
    }
  }
}

$.get("https://jsonplaceholder.typicode.com/users", function(response) {
  let comp = new UsersListComponent(response);
  $("main").append(comp.element);
});

class AddressComponent {
  constructor(address) {
    this.street = address.street;
    this.city = address.city;
    this.zipcode = address.zipcode;
    this.createElement();
  }

  createElement() {
    this.element = $(`
      <div address-section>
        <div class="address-content">
          <p class="spn-street">${this.street}</p>
          <p class="spn-city">${this.city}</p>
          <p class="spn-zipcode">${this.zipcode}</p>
        </div>
        <button class="btn-address">Toggle Address</button>
      </div>
    `);

    let addressButton = this.element.find("button.btn-address");
    let addressSection = this.element.find(".address-content");
    addressSection.hide();
    addressButton.on("click", () => {
      addressSection.toggle("fast", function() {});
    });
  }
}
