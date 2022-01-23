import path from 'path'
import fs from 'fs'
import sizeOf from 'image-size'

export function ensureDirectoryExistence(filePath: string) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}


export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function pageUrlToName(url:string) {
  const splitted = url.split('/')
  const name = splitted[splitted.length - 2] === 'content' ? 'home' : splitted[splitted.length - 2]
  return name 
} 

export function getImageDimensions(path: string) {
  return sizeOf(path);
}