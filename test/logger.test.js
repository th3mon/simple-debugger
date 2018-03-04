import Logger from '../src/logger';

let logger;
let loggerId = 666;
let notModifiedBodyPaddingTop;

const removeNode = node => node.parentNode.removeChild(node);
const removeLogger = () =>
  document.body
    .querySelectorAll('.Logger')
    .forEach( removeNode );

beforeEach(() => {
  notModifiedBodyPaddingTop = Number.parseInt(document.body.style.paddingTop, 10) || 0;
  logger = new Logger(loggerId);
});
afterEach( removeLogger );

it('to be defined', () => expect(logger).toBeDefined());

describe('constructor', () => {
  it('should create main container', () =>
    expect(logger.mainContainer).toBeTruthy()
  );

  it('should add main container to DOM', () =>
    expect(document.body.querySelector('.Logger')).toBeTruthy()
  );

  it('should main container have id', () => {
    const mainContainer = document.getElementById('Logger-666');

    expect(mainContainer.id).toBe('Logger-666');
  });

  it('move content by main containers height', () => {
    const bodyPaddingTop = Number.parseInt(document.body.style.paddingTop, 10) || 0;

    expect(bodyPaddingTop - logger.mainContainer.height).toEqual(notModifiedBodyPaddingTop);
  });

  it('should set id', () => expect(logger.id).toEqual(666) );

  it('should react on rised error', () => {
    logger.logError = jest.fn().mockName('logError');
    window.onerror();

    expect(logger.logError).toHaveBeenCalled();
  });

  it('should add className "loggerOnBoard" to body', () =>
    expect(document.body.classList.contains('LoggerOnBoard')).toBe(true)
  );
});

describe('add message', () => {
  it('should insert into messages', () => {
    logger.add('Some message');

    expect(logger.messages.length).toEqual(1);
  });

  it('should have text', () => {
    logger.add('Some message');

    const messageId = `LoggerMessage-${logger.id}-0`;
    const message = logger.messages.find(item => item.id === messageId);

    expect(message.text).toBe('Some message');
  });

  it('should have id', () => {
    logger.add('Some message');

    const messageId = `LoggerMessage-${logger.id}-0`;
    const message = logger.messages.find(item => item.id === messageId);

    expect(message.id).toEqual(messageId);
  });

  it('should increase messageId', () => {
    logger.add('Some message');

    expect(logger.messageId).toBeGreaterThan(0);
  });

  it('should insert to DOM', () => {
    logger.add('Some message');

    const messageElement = document.body.querySelector('.Logger__message');
    const messageId = `LoggerMessage-${logger.id}-0`;

    expect(messageElement).toBeTruthy();
    expect(messageElement.innerText).toBe('Some message');
    expect(messageElement.getAttribute('id')).toBe(messageId);
    expect(messageElement.classList.contains(messageId)).toBe(true);
  });

  it('should insert 3 messages', () => {
    logger.add('Message nr 1');
    logger.add('Message nr 2');
    logger.add('Message nr 3');

    expect(logger.messages.length).toEqual(3);
  });

  it('should increase messageId to 3', () => {
    logger.add('Message nr 1');
    logger.add('Message nr 2');
    logger.add('Message nr 3');

    expect(logger.messageId).toEqual(3);
  });

  it('should insert 3 messages into DOM', () => {
    logger.add('Message nr 1');
    logger.add('Message nr 2');
    logger.add('Message nr 3');

    const messages = document.body.querySelectorAll('.Logger__message');

    expect(messages.length).toEqual(3);
  });

  it('should get 2nd message of 3 added messages', () => {
    logger.add('Message nr 1');
    logger.add('Message nr 2');
    logger.add('Message nr 3');

    const secondMessage = document.body.querySelector('.Logger__message:nth-child(2)');

    expect(secondMessage.innerText).toEqual('Message nr 2');
  });
});

describe('remove message', () => {
  const messageId = 0;

  it('should remove message from messages', () => {
    logger.add('Some message');
    logger.remove(messageId);

    const message = logger.messages.find(item => item.id === messageId);

    expect(message).toBeUndefined();
  });

  it('should remove message from DOM', () => {
    logger.add('Some message');
    let message = document.body.querySelector('.Logger__message');

    expect(message).toBeTruthy();

    logger.remove(messageId);
    message = document.body.querySelector('.Logger__message');

    expect(message).toBeFalsy();
  });

  it('should remove 2nd message of 3 added messages', () => {
    logger.add('Message nr 1');
    logger.add('Message nr 2');
    logger.add('Message nr 3');

    const secondMessageId = 1;
    logger.remove(secondMessageId);

    const firstMessage = document.body.querySelector('.LoggerMessage-666-0');
    const secondMessage = document.body.querySelector('.LoggerMessage-666-1');
    const thirdMessage = document.body.querySelector('.LoggerMessage-666-2');

    expect(firstMessage).toBeTruthy();
    expect(secondMessage).toBeFalsy();
    expect(thirdMessage).toBeTruthy();

    expect(firstMessage.innerText).toEqual('Message nr 1');
    expect(thirdMessage.innerText).toEqual('Message nr 3');
  });
});

describe('logError', () => {
  it('should add error object as message', () => {
    const error = new Error('Some error');

    jest.spyOn(logger, 'add');
    logger.logError(error);

    expect(logger.add).toHaveBeenCalledWith(
      expect.stringContaining(`error: ${error}`)
    );
  });

  it('should add error source as message', () => {
    const error = new Error('Some error');
    const source = 'Some source';

    jest.spyOn(logger, 'add');
    logger.logError(error, source);

    expect(logger.add).toHaveBeenCalledWith(
      expect.stringContaining(source)
    );
  });

  it('should add error line as message', () => {
    const error = new Error('Some error');
    const source = 'Some source';
    const line = 'Some line';

    jest.spyOn(logger, 'add');
    logger.logError(error, source, line);

    expect(logger.add).toHaveBeenCalledWith(
      expect.stringContaining(line)
    );
  });
});

describe('createMessageElement', () => {
  let messageId;
  let messageContent;
  let messageConfig;
  let messageElement;

  beforeEach(() => {
    loggerId = logger.id;
    messageId = logger.messageId;
    messageContent = 'Some message';

    messageConfig = {
      id: `LoggerMessage-${loggerId}-${messageId}`,
      text: messageContent
    };

    messageElement = logger.createMessageElement(messageConfig);
  });

  it('should created message element be HTMLParagraphElement', () => {
    expect(messageElement.toString()).toBe('[object HTMLParagraphElement]');
  });

  it('should create message with given id', () => {
    const id = `LoggerMessage-${loggerId}-${messageId}`;

    expect(messageElement.getAttribute('id')).toEqual(id);
  });

  it('should create message with given content', () => {
    expect(messageElement.innerText).toEqual('Some message');
  });

  it('should create message with given id as className', () => {
    const id = `LoggerMessage-${loggerId}-${messageId}`;

    expect(messageElement.classList.contains(id)).toBe(true);
  });
});
