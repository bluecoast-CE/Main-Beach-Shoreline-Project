class Modal extends hyperHTML.Component {
  constructor(data, name) {
    super();
    this.setState({
      name: name,
      data: data,
      show: true,
      currentItem: data.imgs.length - 1
    });
  }

  onclick(e) {
    // Close if clicking on overlay
    if(e.target.id === "modal" || e.target.className === "modal-close") {
      this.setState({
        show: false
      });
    }
  }

  onchange(e) {
    this.setState({
      currentItem: parseInt(e.target.value, 10)
    });
  }


  render() {

    // Download link
    const exportSrc = this.state.data.exportSrc;

    return this.html`
      <div class="${this.state.show ? 'modal' : 'modal hidden'}" onclick="${this}">
        <div class="modal-content">
          <div class="modal-close" onclick="${this}"></div>
          <h3 class="modal-title">${this.state.name}</h3>
          <div class="modal-select">
            Choose data:
            <select onchange="${this}">
              ${this.state.data && this.state.data.imgs && this.state.data.imgs.map((item, index) => {
                  return hyperHTML.wire(item)`<option value="${index}">${item.label}</option>`
                }
              )}
            </select>
          </div>
          ${exportSrc ?
            hyperHTML.wire()`<div class="u-spacer-top"><a href="${exportSrc}"><button class="modal-download">Download data</button></a></div>`: ''
          }
          ${this.state.data && this.state.data.imgs &&
            hyperHTML.wire()`<a href="${this.state.data.imgs[this.state.currentItem].imgSrc}" target="_blank"><img class="modal-img u-spacer-top" src="${this.state.data.imgs[this.state.currentItem].imgSrc}" /></a>` 
          }
        </div>
      </div>
  `;
  }
}
