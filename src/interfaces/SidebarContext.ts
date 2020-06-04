import MonumentIntarface from './Monument';

export default interface SidebarContextInterface {
  monument: MonumentIntarface;
  setCurrentMonument: (monument: MonumentIntarface) => void;
  sidebarIsOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
