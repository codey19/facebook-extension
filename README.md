FB Cookie Blocker
A minimal Chrome extension that stops Facebook from tracking your session via cookies. No UI, no settings, just purely functional.

Facebook progressively sets cookies while you browse to detect that you're not logged in, eventually hitting you with a forced login wall. This extension kills that in two ways:

Wipes any existing Facebook cookies the moment you navigate to the site
Blocks Facebook's servers from setting new cookies while you're on the page

The result is Facebook never accumulates enough session data to know who you are or trigger the login prompt.

Side effect: This will also prevent you from logging into Facebook intentionally. If you need to log in, disable the extension first.

Files

background.js — service worker that clears cookies and cached data on each page load
rules.json — network-level rules that strip Set-Cookie headers from Facebook responses before the browser processes them
manifest.json — extension config, declares permissions and registers the ruleset

Tech

Chrome Extensions Manifest V3 — the current extension standard
chrome.cookies API — reads and removes cookies for facebook.com and related domains
chrome.browsingData API — clears cache, localStorage, IndexedDB, and service workers scoped to Facebook's origin
declarativeNetRequest — intercepts HTTP responses at the network layer and strips Set-Cookie headers before they land; faster and more reliable than doing it in JavaScript
Background Service Worker — replaces the old persistent background page in MV3; Chrome spins it up when needed and shuts it down when idle