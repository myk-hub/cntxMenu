document.write(startMenuBuild(menuItems));

function buildMenu(menuItems, submenu) {
  let result = (submenu) ? '<ul>' : '<ul id="innerMenu">';

  for (const item of menuItems) {
    if (item.status === 'inactive') {
      result += `<li class="inactive">${item.id}</li>`;
    } else if (item.submenu) {
      result += `<li class="submenu">
                   <a href="${item.link}">${item.id} </a>&#9656;
                   <div class="wrapper">${buildMenu(item.submenu, true)}</div>
                 </li>`;
    } else {
      result += `<li><a href="${item.link}">${item.id}</a></li>`;
    }
  }

  return result += '</ul>';
}

function startMenuBuild(menuItems) {
  return `<div id="contextMenu">
            <div id="scrollUp">&#9652;</div>
            ${buildMenu(menuItems, false)}
            <div id="scrollDown">&#9662;</div>
          </div>`;
}

const menu = document.getElementById("contextMenu");
const innerMenu = document.getElementById("innerMenu");
const scrollUpButton = document.getElementById("scrollUp");
const scrollDownButton = document.getElementById("scrollDown");
const menuItemHeight = document.getElementsByClassName("submenu")[0].clientHeight;

function placeMenu(eventArgs) {
  menu.style.zIndex = 99;
  menu.style.left = `${eventArgs.pageX + 5}px`;
  menu.style.top = `${eventArgs.pageY}px`;
}

function show() {
  const menuHeight = menuItems.length * menuItemHeight;

  if (menuHeight + parseInt(menu.style.top) >= window.innerHeight) {
    innerMenu.style.height = `${Math.floor((window.innerHeight -
      parseInt(menu.style.top) - scrollUpButton.offsetHeight -
      scrollDownButton.offsetHeight) / menuItemHeight) * menuItemHeight}px`;

    scrollUpButton.style.display = "block";
    scrollDownButton.style.display = "block";
    innerMenu.style.overflow = "hidden";
    menu.style.visibility = "visible";
  } else {
    scrollUpButton.style.display = "none";
    scrollDownButton.style.display = "none";
    innerMenu.style.overflow = "visible";
    innerMenu.style.height = "auto";
    menu.style.visibility = "visible";
  }
}

function hide() {
  menu.style.visibility = "hidden";
  innerMenu.style.height = "auto";
}

((() => {
  const submenuScope = document.getElementsByClassName("submenu");
  const submenuStyle = document.getElementsByClassName("wrapper");

  function submenuLineUp(n) {
    submenuScope[n].addEventListener("mouseover", () => {
      const itemTopPosition = submenuScope[n].offsetTop - innerMenu.scrollTop;
      submenuStyle[n].style.top = `${itemTopPosition}px`;
    });
  }

  for (let i = 0; i < submenuScope.length; i++) {
    submenuLineUp(i);
  }
}))();

document.getElementById("testarea").addEventListener("click", eventArgs => {
  if (menu.style.visibility === "visible") {
    hide();
  } else {
    placeMenu(eventArgs);
    show();
  }
});

document.getElementById("scrollUp").addEventListener("click", () => {
  innerMenu.scrollTop -= menuItemHeight;
});

document.getElementById("scrollDown").addEventListener("click", () => {
  innerMenu.scrollTop += menuItemHeight;
});
