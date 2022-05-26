class Carousel {
  /**
   * @param {HTMLElement} element
   * @param {String} styleLink - Path to access to css file for the carousel from page
   * @param {Object} [options] - Object contain all settings for carousel
   * @param {Number} [options.slidesToScroll=1] - Amount items scrolled when move the carousel
   * @param {Number} [options.slidesVisible=1] - Amount items visible in carousel
   * @param {Boolean} [options.navigation=true] - Activate/Deactivate buttons for navigations
   * @param {Number} [options.index=0] - The index of first element showing in carousel
   * @param {Boolean} [options.loop=false] - Activate/Deactivate the loop mode for carousel
   * @param {Boolean} [options.pagination=true] - Activate/Deactivate the pagination for carousel
   * @param {Object} [options.style] - Object contain class and style for carousel class
   * @param {Object} [options.(className)] - Object with class key and style value for personalize element
   * @param {Boolean} [options.autoplay=false] - Activate/Deactivate autoplay mode
   * @param {Number} [options.autoplayDelay=3000] - The amount ms for the autoplay mode
   * @param {String} [options.itemWidth=auto] - Width of items in the carousel
   * @param {Number} [options.itemsSpace=0] - Spacing between items
   * @param {String} [options.carouselWidth="100%"] - Width of carousel.
   */
  constructor(element, styleLink, options = {}) {
    // Setup variables
    this.element = element;
    this.options = Object.assign(
      {},
      {
        slidesToScroll: 1,
        slidesVisible: 1,
        navigation: true,
        index: 0,
        loop: false,
        pagination: true,
        style: {},
        autoplay: false,
        autoplayDelay: 3000,
        itemWidth: "auto",
        itemsSpace: 0,
        centeredItem: false,
        carouselWidth: "100%",
      },
      options
    );
    let children = [].slice.call(this.element.children);
    this.childrenWidth = [];
    for (let i = 0; i < this.element.children.length; i++) {
      this.childrenWidth.push(this.element.children[i].offsetWidth);
    }
    let persoStyle = this.createElement("style");
    this.root = this.createElement("div", { class: "carousel", tabindex: "0" });
    this.element.style.width = this.options.carouselWidth;
    this.container = this.createElement("div", { class: "carouselContainer" });
    this.currentItem = this.options.index;
    this.moveCallbacks = [];
    this.isMobile = window.innerWidth < 800;
    if (this.options.itemWidth !== "auto") {
      this.largest = this.childrenWidth[0];
      for (let i = 0; i < this.childrenWidth.length; i++) {
        if (this.largest > this.childrenWidth[i]) {
          this.largest = this.childrenWidth[i];
        }
      }
    }

    // Edit DOM
    this.items = children.map((child) => {
      let item = this.createElement("div", { class: "carouselItem" });
      item.appendChild(child);
      this.container.appendChild(item);
      return item;
    });
    this.root.appendChild(this.container);
    this.element.appendChild(this.root);
    let linkCss = this.createElement("link", {
      rel: "stylesheet",
      href: styleLink,
    });
    this.element.appendChild(linkCss);
    this.style = this.element.appendChild(persoStyle);

    Object.entries(this.options.style).forEach(([key, value]) => {
      /* if (key.includes("$$")) key = key.replace("$$", "::");
      if (key.includes("$")) key = key.replace("$", ":");
      this.style.innerHTML += "." + key + " { " + value + "}"; */
      this.style.innerHTML +=
        key + JSON.stringify(value).split('"').join("").replace(/,+/g, ";");
    });
    this.setStyle();
    if (this.options.navigation) this.createNavigation();
    if (this.options.pagination && !this.isMobile) this.createPagination();

    // Events
    this.root.addEventListener("keyup", (e) => {
      if (e.key === "ArrowRight" || e.key === "Right") this.next();
      else if (e.key === "ArrowLeft" || e.key === "Left") this.prev();
    });
    window.addEventListener("resize", this.onWindowResize.bind(this));
    this.gotoItem(0);
  }

  setStyle() {
    let ratio = this.items.length / this.slidesVisible;

    if (this.largest !== undefined) {
      this.container.style.width =
        this.items.length * (this.largest + this.options.itemsSpace) + "px";
    }
    this.container.style.width =
      "calc(" +
      ratio * 100 +
      "% + " +
      this.items.length * this.options.itemsSpace +
      "px)";

    this.items.forEach((item) => {
      item.style.marginRight = this.options.itemsSpace + "px";
      if (this.largest !== undefined) {
        item.style.width = this.largest + "px";
      } else {
        item.style.width =
          "calc(" +
          100 / this.slidesVisible / ratio +
          "% - " +
          this.options.itemsSpace * this.slidesVisible +
          "px)";
      }
    });
  }

  createNavigation() {
    let prevButton = this.createElement("div", {
      class: "carouselBtn carouselBtnPrev",
    });
    let nextButton = this.createElement("div", {
      class: "carouselBtn carouselBtnNext",
    });

    //nextButton.style = this.createNavigationStyle().next;
    //prevButton.style = this.createNavigationStyle().prev;
    this.root.appendChild(nextButton);
    this.root.appendChild(prevButton);
    nextButton.addEventListener("click", this.next.bind(this));
    prevButton.addEventListener("click", this.prev.bind(this));

    if (this.options.loop === true) return;
    this.onMove((index) => {
      if (index === 0) {
        prevButton.classList.add("carouselBtnHidden");
      } else {
        prevButton.classList.remove("carouselBtnHidden");
      }
      if (this.items[this.currentItem + this.slidesVisible] === undefined) {
        nextButton.classList.add("carouselBtnHidden");
      } else {
        nextButton.classList.remove("carouselBtnHidden");
      }
    });
  }

  createPagination() {
    let pagination = this.createElement("div", {
      class: "carouselPagination",
    });
    let buttons = [];
    this.root.appendChild(pagination);
    for (let i = 0; i < this.items.length; i = i + this.slidesToScroll) {
      let button = this.createElement("div", {
        class: "carouselPaginationButton",
      });
      button.addEventListener("click", () => this.gotoItem(i));
      pagination.appendChild(button);
      buttons.push(button);
    }
    this.onMove((index) => {
      let activeButton = buttons[Math.floor(index / this.slidesToScroll)];
      buttons.forEach((btn) =>
        btn.classList.remove("carouselPaginationButtonActive")
      );
      if (activeButton)
        activeButton.classList.add("carouselPaginationButtonActive");
    });
  }

  next() {
    this.gotoItem(this.currentItem + this.slidesToScroll);
  }

  prev() {
    this.gotoItem(this.currentItem - this.slidesToScroll);
  }

  /**
   * Navigate to target slide
   * @param {Number} index
   */
  gotoItem(index) {
    if (this.interval) clearInterval(this.interval);
    if (this.options.autoplay) {
      this.interval = setInterval(() => {
        this.next();
      }, this.options.autoplayDelay);
    }
    if (index < 0) {
      if (this.options.loop === false && this.options.autoplay === false)
        return;
      index = this.items.length - this.slidesVisible;
    } else if (
      index >= this.items.length ||
      (this.items[this.currentItem + this.slidesVisible] === undefined &&
        index > this.currentItem)
    ) {
      if (this.options.loop === false && this.options.autoplay === false)
        return;
      index = 0;
    }
    let translateX = (index * -100) / this.items.length + "%";
    if (this.options.centeredItem)
      translateX =
        "calc(" +
        (index * -100) / this.items.length +
        "%" +
        " + " +
        this.options.itemsSpace / this.slidesVisible +
        "px)";
    if (this.options.centeredItem && this.slidesVisible === 1)
      translateX =
        "calc(" +
        (index * -100) / this.items.length +
        "%" +
        " - " +
        this.options.itemsSpace * index +
        "px)";
    this.container.style.transform = `translate3d(calc(${translateX} + ${
      this.options.itemsSpace * index
    }px), 0, 0)`;
    this.currentItem = index;

    this.moveCallbacks.forEach((cb) => cb(index));
  }

  onMove(cb) {
    this.moveCallbacks.push(cb);
  }

  onWindowResize() {
    this.gotoItem(this.currentItem);
    let mobile = window.innerWidth < 800;
    if (mobile !== this.isMobile) {
      this.isMobile = mobile;
      this.setStyle();

      this.moveCallbacks.forEach((cb) => cb(this.currentItem));
    }
  }

  get slidesToScroll() {
    return this.isMobile ? 1 : this.options.slidesToScroll;
  }

  get slidesVisible() {
    return this.isMobile ? 1 : this.options.slidesVisible;
  }

  /**
   * Create an element with attributes
   * @param {String} htmlTag
   * @param {Object} [attributes={}]
   * @returns {HTMLElement}
   */
  createElement(htmlTag, attributes = {}) {
    if (typeof htmlTag !== "string")
      throw new Error("The type of element are not a string");

    this.attributes = attributes;

    let element = document.createElement(htmlTag);
    Object.entries(this.attributes).forEach(([key, value]) =>
      element.setAttribute(key, value)
    );

    return element;
  }
}

new Carousel(
  document.getElementById("carousel1"),
  "./public/assets/css/carousel.css",
  {
    style: {
      ".carouselContainer": {
        transition: "transform 1.5s ease",
      },
      ".carouselBtn": {
        opacity: 0.3,
      },
      ".carouselBtn:hover": {
        opacity: 0.5,
      },
      ".carouselBtnNext": {
        right: "5px",
      },
      ".carouselBtnPrev": {
        left: "5px",
      },
    },
    itemWidth: "auto",
    itemsSpace: 30,
    autoplay: true,
    autoplayDelay: 5000,
    loop: true,
    carouselWidth: "100%",
    slidesVisible: 2,
    centeredItem: true,
  }
);
