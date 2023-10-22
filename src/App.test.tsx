import React from 'react';
import {Request} from "./models/request";

test('Operation', () => {
  expect(true).toBe(true)
});

test('Request change', () => {
  const request = new Request('test', 'get')
  expect(request.url).toBe('test')
  let changedReq = request.takeChanged({
    url: 'hello'
  })
  expect(changedReq.url).toBe('hello')
  changedReq = request.takeChanged({
    method: 'post'
  })
  expect(changedReq.method).toBe('post')
  changedReq = request.takeChanged({
    method: 'post',
    url: 'second'
  })
  expect(changedReq.method).toBe('post')
  expect(changedReq.url).toBe('second')
})
