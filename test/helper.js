const chai = require('chai');
chai.use(require('chai-enzyme')());
chai.use(require('sinon-chai'));

global.expect = chai.expect;

const { JSDOM } = require('jsdom');

const { window } = new JSDOM('<!doctype html><html><body></body></html>');
global.window = window;
global.document = window.document;
