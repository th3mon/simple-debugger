import { removeNode } from './dom';

const createMainContainer = id => {
  const mainContainer = document.createElement('div');

  mainContainer.setAttribute('id', `Logger-${id}`);
  mainContainer.classList.add('Logger', `Logger-${id}`);

  return mainContainer;
};
const addMainClass = () => document.body.classList.add('LoggerOnBoard');

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

    addMainClass();

    window.onerror = (e, src, line) => this.logError(e, src, line);

    this.moveContentByHeightOfMainContainer();
  }

  add (message) {
    const messageConfig = {
      id: `LoggerMessage-${this.id}-${this.messageId}`,
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
    pararaph.classList.add(id, 'Logger__message');

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
    const message = document.body.querySelector(`.LoggerMessage-${this.id}-${messageId}`);

    removeNode(message);
  }

  logError (error, source, line) {
    this.add(`error: ${error} in ${source} at line ${line}`);
  }
}

export default Logger;
