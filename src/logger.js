import { removeNode } from './dom';

const mainClass = 'simple-debugger';
const createMainContainer = id => {
  const mainContainer = document.createElement('div');

  mainContainer.setAttribute('id', `Logger-${id}`);
  mainContainer.classList.add('logger', `logger-${id}`);

  return mainContainer;
};
const addMainClass = () => document.body.classList.add(mainClass);
const hasMainClass = () => document.body.classList.contains(mainClass);

class Logger {
  constructor (id) {
    const getMainContainerHeight = () => Math.max(
      this.mainContainer.offsetHeight,
      this.mainContainer.clientHeight,
      0
    );

    this.id = id;
    this.messageId = 0;
    this.messages = [];

    this.mainContainer = createMainContainer(id);

    document.body.appendChild(this.mainContainer);
    this.mainContainer.height = getMainContainerHeight();


    window.onerror = (e, src, line) => this.logError(e, src, line);

    if (!hasMainClass()) {
      this.moveContentByHeightOfMainContainer();
    }

    addMainClass();
  }

  add (message) {
    const messageConfig = {
      id: `logger-${this.id}__message-${this.messageId}`,
      text: message
    };

    this.messages.push(messageConfig);
    const messageElement = this.createMessageElement(messageConfig);

    this.addMessageToDOM(messageElement);

    this.messageId += 1;
  }

  createMessageElement ({ id, text }) {
    const pararaph = document.createElement('p');

    pararaph.setAttribute('id', id);
    pararaph.innerText = text;
    pararaph.classList.add(id, 'logger__message');

    return pararaph;
  }

  addMessageToDOM (messageElement) {
    this.mainContainer.appendChild(messageElement);
  }

  moveContentByHeightOfMainContainer () {
    const bodyPaddingTop = Number.parseInt(document.body.style.paddingTop, 10) || 0;

    document.body.style.paddingTop = `${this.mainContainer.height + bodyPaddingTop}px`;
  }

  remove (messageId) {
    this.messages = [
      ...this.messages.slice(0, messageId),
      ...this.messages.slice(messageId + 1)
    ];

    this.removeFromDOM(messageId);
  }

  removeFromDOM (messageId) {
    const message = document.body.querySelector(`.logger-${this.id}__message-${messageId}`);

    removeNode(message);
  }

  logError (error, source, line) {
    this.add(`error: ${error} in ${source} at line ${line}`);
  }
}

export {
  mainClass,
  Logger as default
}
