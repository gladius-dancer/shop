declare module '*.scss' {
    const content: { [className: string]: string };
    export = content;
}

declare module '*.jpg';
declare module '*.png';
declare module '*.svg';
declare module '*.webp';
declare module '*.json';
declare module '*.js';
declare module '*.ts';

declare const API_HOST: string;
declare const GOOGLE_RE_CAPTCHA_SITE_KEY: string;
