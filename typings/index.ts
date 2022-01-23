export interface INavItem {
  key: string
  href: string
  label: string
}

export interface IImageData {
  id: string,
  src: string,
  dimensions: { height: number, width: number, type: string }
}

export interface IContextState {
  imageData: IImageData[] | [];
}

export interface IEmail {
  name: string; email: string; subject: string; message: string;
}

