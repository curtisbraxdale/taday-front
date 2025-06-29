interface PixelIconProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

// Windows 98 style pixel art icons as SVG components with more detail
export const PixelCalendar = ({ size = 'md', className = '' }: PixelIconProps) => {
  const sizeMap = { sm: 16, md: 20, lg: 32 };
  const iconSize = sizeMap[size];
  
  return (
    <svg 
      width={iconSize} 
      height={iconSize} 
      viewBox="0 0 24 24" 
      className={`pixel-icon-${size} ${className}`}
      style={{ imageRendering: 'pixelated' }}
    >
      {/* Calendar base */}
      <rect x="3" y="5" width="18" height="16" fill="#ffffff" stroke="#000000" strokeWidth="1"/>
      <rect x="4" y="6" width="16" height="14" fill="#c0c0c0"/>
      
      {/* Header */}
      <rect x="3" y="5" width="18" height="4" fill="#0000ff"/>
      <rect x="4" y="6" width="16" height="2" fill="#000080"/>
      
      {/* Spiral bindings */}
      <rect x="6" y="2" width="2" height="5" fill="#808080"/>
      <rect x="16" y="2" width="2" height="5" fill="#808080"/>
      <rect x="6" y="1" width="2" height="1" fill="#404040"/>
      <rect x="16" y="1" width="2" height="1" fill="#404040"/>
      
      {/* Calendar grid */}
      <rect x="6" y="11" width="2" height="2" fill="#000000"/>
      <rect x="9" y="11" width="2" height="2" fill="#000000"/>
      <rect x="12" y="11" width="2" height="2" fill="#000000"/>
      <rect x="15" y="11" width="2" height="2" fill="#000000"/>
      
      <rect x="6" y="14" width="2" height="2" fill="#000000"/>
      <rect x="9" y="14" width="2" height="2" fill="#ff0000"/>
      <rect x="12" y="14" width="2" height="2" fill="#000000"/>
      <rect x="15" y="14" width="2" height="2" fill="#000000"/>
      
      <rect x="6" y="17" width="2" height="2" fill="#000000"/>
      <rect x="9" y="17" width="2" height="2" fill="#000000"/>
      <rect x="12" y="17" width="2" height="2" fill="#000000"/>
    </svg>
  );
};

export const PixelCheckbox = ({ size = 'md', className = '' }: PixelIconProps) => {
  const sizeMap = { sm: 16, md: 20, lg: 32 };
  const iconSize = sizeMap[size];
  
  return (
    <svg 
      width={iconSize} 
      height={iconSize} 
      viewBox="0 0 24 24" 
      className={`pixel-icon-${size} ${className}`}
      style={{ imageRendering: 'pixelated' }}
    >
      {/* Checkbox border */}
      <rect x="4" y="4" width="16" height="16" fill="#ffffff" stroke="#000000" strokeWidth="2"/>
      <rect x="5" y="5" width="14" height="14" fill="#c0c0c0"/>
      
      {/* Inner shadow */}
      <rect x="6" y="6" width="12" height="1" fill="#808080"/>
      <rect x="6" y="6" width="1" height="12" fill="#808080"/>
      
      {/* Checkmark */}
      <rect x="8" y="12" width="2" height="2" fill="#008000"/>
      <rect x="10" y="14" width="2" height="2" fill="#008000"/>
      <rect x="12" y="12" width="2" height="2" fill="#008000"/>
      <rect x="14" y="10" width="2" height="2" fill="#008000"/>
      <rect x="16" y="8" width="2" height="2" fill="#008000"/>
      
      {/* Checkmark shadow */}
      <rect x="9" y="13" width="1" height="1" fill="#004000"/>
      <rect x="11" y="15" width="1" height="1" fill="#004000"/>
      <rect x="13" y="13" width="1" height="1" fill="#004000"/>
      <rect x="15" y="11" width="1" height="1" fill="#004000"/>
      <rect x="17" y="9" width="1" height="1" fill="#004000"/>
    </svg>
  );
};

export const PixelHome = ({ size = 'md', className = '' }: PixelIconProps) => {
  const sizeMap = { sm: 16, md: 20, lg: 32 };
  const iconSize = sizeMap[size];
  
  return (
    <svg 
      width={iconSize} 
      height={iconSize} 
      viewBox="0 0 24 24" 
      className={`pixel-icon-${size} ${className}`}
      style={{ imageRendering: 'pixelated' }}
    >
      {/* House base */}
      <rect x="6" y="12" width="12" height="10" fill="#c0c0c0" stroke="#000000" strokeWidth="1"/>
      <rect x="7" y="13" width="10" height="8" fill="#ffffff"/>
      
      {/* Roof */}
      <rect x="11" y="4" width="2" height="2" fill="#ff0000"/>
      <rect x="9" y="6" width="6" height="2" fill="#ff0000"/>
      <rect x="7" y="8" width="10" height="2" fill="#ff0000"/>
      <rect x="5" y="10" width="14" height="2" fill="#ff0000"/>
      
      {/* Roof shadow */}
      <rect x="12" y="5" width="1" height="1" fill="#800000"/>
      <rect x="14" y="7" width="1" height="1" fill="#800000"/>
      <rect x="16" y="9" width="1" height="1" fill="#800000"/>
      <rect x="18" y="11" width="1" height="1" fill="#800000"/>
      
      {/* Door */}
      <rect x="10" y="16" width="4" height="6" fill="#8B4513"/>
      <rect x="11" y="17" width="2" height="4" fill="#A0522D"/>
      <rect x="13" y="18" width="1" height="1" fill="#000000"/>
      
      {/* Windows */}
      <rect x="8" y="15" width="2" height="2" fill="#87CEEB"/>
      <rect x="14" y="15" width="2" height="2" fill="#87CEEB"/>
      <rect x="9" y="15" width="1" height="2" fill="#4682B4"/>
      <rect x="15" y="15" width="1" height="2" fill="#4682B4"/>
      <rect x="8" y="16" width="2" height="1" fill="#4682B4"/>
      <rect x="14" y="16" width="2" height="1" fill="#4682B4"/>
    </svg>
  );
};

export const PixelUser = ({ size = 'md', className = '' }: PixelIconProps) => {
  const sizeMap = { sm: 16, md: 20, lg: 32 };
  const iconSize = sizeMap[size];
  
  return (
    <svg 
      width={iconSize} 
      height={iconSize} 
      viewBox="0 0 24 24" 
      className={`pixel-icon-${size} ${className}`}
      style={{ imageRendering: 'pixelated' }}
    >
      {/* Head */}
      <rect x="8" y="4" width="8" height="8" fill="#ffdbac" stroke="#000000" strokeWidth="1"/>
      <rect x="9" y="5" width="6" height="6" fill="#ffeaa7"/>
      
      {/* Hair */}
      <rect x="8" y="3" width="8" height="2" fill="#8B4513"/>
      <rect x="7" y="4" width="2" height="4" fill="#8B4513"/>
      <rect x="15" y="4" width="2" height="4" fill="#8B4513"/>
      
      {/* Eyes */}
      <rect x="10" y="7" width="1" height="1" fill="#000000"/>
      <rect x="13" y="7" width="1" height="1" fill="#000000"/>
      
      {/* Nose */}
      <rect x="11" y="8" width="2" height="1" fill="#dda0dd"/>
      
      {/* Mouth */}
      <rect x="10" y="10" width="4" height="1" fill="#000000"/>
      
      {/* Body */}
      <rect x="7" y="12" width="10" height="10" fill="#0000ff" stroke="#000000" strokeWidth="1"/>
      <rect x="8" y="13" width="8" height="8" fill="#4169e1"/>
      
      {/* Arms */}
      <rect x="5" y="14" width="2" height="6" fill="#ffdbac"/>
      <rect x="17" y="14" width="2" height="6" fill="#ffdbac"/>
      
      {/* Hands */}
      <rect x="4" y="19" width="2" height="2" fill="#ffdbac"/>
      <rect x="18" y="19" width="2" height="2" fill="#ffdbac"/>
    </svg>
  );
};

export const PixelCellPhone = ({ size = 'md', className = '' }: PixelIconProps) => {
  const sizeMap = { sm: 16, md: 20, lg: 32 };
  const iconSize = sizeMap[size];
  
  return (
    <svg 
      width={iconSize} 
      height={iconSize} 
      viewBox="0 0 24 24" 
      className={`pixel-icon-${size} ${className}`}
      style={{ imageRendering: 'pixelated' }}
    >
      {/* Phone body */}
      <rect x="7" y="2" width="10" height="20" fill="#000000" stroke="#000000" strokeWidth="1"/>
      <rect x="8" y="3" width="8" height="18" fill="#404040"/>
      
      {/* Screen */}
      <rect x="9" y="5" width="6" height="10" fill="#00ff00"/>
      <rect x="10" y="6" width="4" height="8" fill="#008000"/>
      
      {/* Screen content lines */}
      <rect x="10" y="7" width="4" height="1" fill="#00ff00"/>
      <rect x="10" y="9" width="4" height="1" fill="#00ff00"/>
      <rect x="10" y="11" width="4" height="1" fill="#00ff00"/>
      <rect x="10" y="13" width="4" height="1" fill="#00ff00"/>
      
      {/* Keypad */}
      <rect x="9" y="16" width="1" height="1" fill="#c0c0c0"/>
      <rect x="11" y="16" width="1" height="1" fill="#c0c0c0"/>
      <rect x="13" y="16" width="1" height="1" fill="#c0c0c0"/>
      
      <rect x="9" y="18" width="1" height="1" fill="#c0c0c0"/>
      <rect x="11" y="18" width="1" height="1" fill="#c0c0c0"/>
      <rect x="13" y="18" width="1" height="1" fill="#c0c0c0"/>
      
      <rect x="9" y="20" width="1" height="1" fill="#c0c0c0"/>
      <rect x="11" y="20" width="1" height="1" fill="#c0c0c0"/>
      <rect x="13" y="20" width="1" height="1" fill="#c0c0c0"/>
      
      {/* Antenna */}
      <rect x="11" y="1" width="2" height="2" fill="#808080"/>
      <rect x="12" y="0" width="1" height="1" fill="#808080"/>
      
      {/* Phone shadow */}
      <rect x="8" y="21" width="8" height="1" fill="#202020"/>
      <rect x="16" y="3" width="1" height="18" fill="#202020"/>
      
      {/* Speaker */}
      <rect x="10" y="4" width="4" height="1" fill="#000000"/>
      
      {/* Signal bars */}
      <rect x="15" y="4" width="1" height="1" fill="#00ff00"/>
      <rect x="15" y="3" width="1" height="2" fill="#00ff00"/>
      <rect x="16" y="2" width="1" height="3" fill="#00ff00"/>
    </svg>
  );
};

export const PixelSettings = ({ size = 'md', className = '' }: PixelIconProps) => {
  const sizeMap = { sm: 16, md: 20, lg: 32 };
  const iconSize = sizeMap[size];
  
  return (
    <svg 
      width={iconSize} 
      height={iconSize} 
      viewBox="0 0 24 24" 
      className={`pixel-icon-${size} ${className}`}
      style={{ imageRendering: 'pixelated' }}
    >
      {/* Gear outer ring */}
      <rect x="8" y="8" width="8" height="8" fill="#c0c0c0" stroke="#000000" strokeWidth="1"/>
      <rect x="9" y="9" width="6" height="6" fill="#808080"/>
      
      {/* Center hole */}
      <rect x="11" y="11" width="2" height="2" fill="#000000"/>
      
      {/* Gear teeth */}
      <rect x="11" y="4" width="2" height="4" fill="#808080"/>
      <rect x="11" y="16" width="2" height="4" fill="#808080"/>
      <rect x="4" y="11" width="4" height="2" fill="#808080"/>
      <rect x="16" y="11" width="4" height="2" fill="#808080"/>
      
      {/* Diagonal teeth */}
      <rect x="6" y="6" width="2" height="2" fill="#808080"/>
      <rect x="16" y="6" width="2" height="2" fill="#808080"/>
      <rect x="6" y="16" width="2" height="2" fill="#808080"/>
      <rect x="16" y="16" width="2" height="2" fill="#808080"/>
      
      {/* Gear highlights */}
      <rect x="9" y="8" width="6" height="1" fill="#e0e0e0"/>
      <rect x="8" y="9" width="1" height="6" fill="#e0e0e0"/>
      
      {/* Gear shadows */}
      <rect x="9" y="15" width="6" height="1" fill="#404040"/>
      <rect x="15" y="9" width="1" height="6" fill="#404040"/>
    </svg>
  );
};

export const PixelLogout = ({ size = 'md', className = '' }: PixelIconProps) => {
  const sizeMap = { sm: 16, md: 20, lg: 32 };
  const iconSize = sizeMap[size];
  
  return (
    <svg 
      width={iconSize} 
      height={iconSize} 
      viewBox="0 0 24 24" 
      className={`pixel-icon-${size} ${className}`}
      style={{ imageRendering: 'pixelated' }}
    >
      {/* Door frame */}
      <rect x="3" y="3" width="12" height="18" fill="#c0c0c0" stroke="#000000" strokeWidth="1"/>
      <rect x="4" y="4" width="10" height="16" fill="#8B4513"/>
      
      {/* Door handle */}
      <rect x="12" y="11" width="2" height="2" fill="#FFD700"/>
      <rect x="13" y="12" width="1" height="1" fill="#FFA500"/>
      
      {/* Arrow pointing out */}
      <rect x="16" y="11" width="4" height="2" fill="#ff0000"/>
      <rect x="18" y="9" width="2" height="2" fill="#ff0000"/>
      <rect x="18" y="13" width="2" height="2" fill="#ff0000"/>
      <rect x="20" y="7" width="2" height="2" fill="#ff0000"/>
      <rect x="20" y="15" width="2" height="2" fill="#ff0000"/>
      
      {/* Arrow shadow */}
      <rect x="17" y="12" width="3" height="1" fill="#800000"/>
      <rect x="19" y="10" width="1" height="1" fill="#800000"/>
      <rect x="19" y="14" width="1" height="1" fill="#800000"/>
      
      {/* Door details */}
      <rect x="6" y="6" width="6" height="1" fill="#A0522D"/>
      <rect x="6" y="8" width="6" height="1" fill="#A0522D"/>
      <rect x="6" y="14" width="6" height="1" fill="#A0522D"/>
      <rect x="6" y="16" width="6" height="1" fill="#A0522D"/>
    </svg>
  );
};

export const PixelPlus = ({ size = 'md', className = '' }: PixelIconProps) => {
  const sizeMap = { sm: 16, md: 20, lg: 32 };
  const iconSize = sizeMap[size];
  
  return (
    <svg 
      width={iconSize} 
      height={iconSize} 
      viewBox="0 0 24 24" 
      className={`pixel-icon-${size} ${className}`}
      style={{ imageRendering: 'pixelated' }}
    >
      {/* Vertical bar */}
      <rect x="10" y="4" width="4" height="16" fill="#008000"/>
      <rect x="11" y="3" width="2" height="1" fill="#00ff00"/>
      <rect x="11" y="20" width="2" height="1" fill="#004000"/>
      
      {/* Horizontal bar */}
      <rect x="4" y="10" width="16" height="4" fill="#008000"/>
      <rect x="3" y="11" width="1" height="2" fill="#00ff00"/>
      <rect x="20" y="11" width="1" height="2" fill="#004000"/>
      
      {/* Center highlight */}
      <rect x="11" y="11" width="2" height="2" fill="#00ff00"/>
      
      {/* 3D effect shadows */}
      <rect x="12" y="5" width="2" height="14" fill="#004000"/>
      <rect x="6" y="12" width="14" height="2" fill="#004000"/>
    </svg>
  );
};

export const PixelMenu = ({ size = 'md', className = '' }: PixelIconProps) => {
  const sizeMap = { sm: 16, md: 20, lg: 32 };
  const iconSize = sizeMap[size];
  
  return (
    <svg 
      width={iconSize} 
      height={iconSize} 
      viewBox="0 0 24 24" 
      className={`pixel-icon-${size} ${className}`}
      style={{ imageRendering: 'pixelated' }}
    >
      {/* Menu lines with 3D effect */}
      <rect x="4" y="6" width="16" height="3" fill="#000000"/>
      <rect x="4" y="5" width="16" height="1" fill="#404040"/>
      <rect x="4" y="9" width="16" height="1" fill="#404040"/>
      
      <rect x="4" y="10" width="16" height="3" fill="#000000"/>
      <rect x="4" y="13" width="16" height="1" fill="#404040"/>
      
      <rect x="4" y="15" width="16" height="3" fill="#000000"/>
      <rect x="4" y="14" width="16" height="1" fill="#404040"/>
      <rect x="4" y="18" width="16" height="1" fill="#404040"/>
    </svg>
  );
};

export const PixelSearch = ({ size = 'md', className = '' }: PixelIconProps) => {
  const sizeMap = { sm: 16, md: 20, lg: 32 };
  const iconSize = sizeMap[size];
  
  return (
    <svg 
      width={iconSize} 
      height={iconSize} 
      viewBox="0 0 24 24" 
      className={`pixel-icon-${size} ${className}`}
      style={{ imageRendering: 'pixelated' }}
    >
      {/* Magnifying glass lens */}
      <rect x="5" y="5" width="10" height="10" fill="#ffffff" stroke="#000000" strokeWidth="2"/>
      <rect x="6" y="6" width="8" height="8" fill="#e6f3ff"/>
      
      {/* Lens highlight */}
      <rect x="7" y="7" width="3" height="3" fill="#ffffff"/>
      <rect x="8" y="8" width="1" height="1" fill="#87ceeb"/>
      
      {/* Handle */}
      <rect x="15" y="15" width="2" height="2" fill="#8B4513"/>
      <rect x="17" y="17" width="2" height="2" fill="#8B4513"/>
      <rect x="19" y="19" width="2" height="2" fill="#8B4513"/>
      
      {/* Handle shadow */}
      <rect x="16" y="16" width="1" height="1" fill="#654321"/>
      <rect x="18" y="18" width="1" height="1" fill="#654321"/>
      <rect x="20" y="20" width="1" height="1" fill="#654321"/>
      
      {/* Lens rim shadow */}
      <rect x="6" y="14" width="8" height="1" fill="#c0c0c0"/>
      <rect x="14" y="6" width="1" height="8" fill="#c0c0c0"/>
    </svg>
  );
};

export const PixelGrid = ({ size = 'md', className = '' }: PixelIconProps) => {
  const sizeMap = { sm: 16, md: 20, lg: 32 };
  const iconSize = sizeMap[size];
  
  return (
    <svg 
      width={iconSize} 
      height={iconSize} 
      viewBox="0 0 24 24" 
      className={`pixel-icon-${size} ${className}`}
      style={{ imageRendering: 'pixelated' }}
    >
      {/* Grid squares with 3D effect */}
      <rect x="3" y="3" width="7" height="7" fill="#c0c0c0" stroke="#000000" strokeWidth="1"/>
      <rect x="4" y="4" width="5" height="5" fill="#ffffff"/>
      <rect x="4" y="4" width="5" height="1" fill="#e0e0e0"/>
      <rect x="4" y="4" width="1" height="5" fill="#e0e0e0"/>
      
      <rect x="14" y="3" width="7" height="7" fill="#c0c0c0" stroke="#000000" strokeWidth="1"/>
      <rect x="15" y="4" width="5" height="5" fill="#ffffff"/>
      <rect x="15" y="4" width="5" height="1" fill="#e0e0e0"/>
      <rect x="15" y="4" width="1" height="5" fill="#e0e0e0"/>
      
      <rect x="3" y="14" width="7" height="7" fill="#c0c0c0" stroke="#000000" strokeWidth="1"/>
      <rect x="4" y="15" width="5" height="5" fill="#ffffff"/>
      <rect x="4" y="15" width="5" height="1" fill="#e0e0e0"/>
      <rect x="4" y="15" width="1" height="5" fill="#e0e0e0"/>
      
      <rect x="14" y="14" width="7" height="7" fill="#c0c0c0" stroke="#000000" strokeWidth="1"/>
      <rect x="15" y="15" width="5" height="5" fill="#ffffff"/>
      <rect x="15" y="15" width="5" height="1" fill="#e0e0e0"/>
      <rect x="15" y="15" width="1" height="5" fill="#e0e0e0"/>
    </svg>
  );
};

export const PixelList = ({ size = 'md', className = '' }: PixelIconProps) => {
  const sizeMap = { sm: 16, md: 20, lg: 32 };
  const iconSize = sizeMap[size];
  
  return (
    <svg 
      width={iconSize} 
      height={iconSize} 
      viewBox="0 0 24 24" 
      className={`pixel-icon-${size} ${className}`}
      style={{ imageRendering: 'pixelated' }}
    >
      {/* List bullets */}
      <rect x="3" y="5" width="3" height="3" fill="#000000"/>
      <rect x="4" y="6" width="1" height="1" fill="#ffffff"/>
      
      <rect x="3" y="10" width="3" height="3" fill="#000000"/>
      <rect x="4" y="11" width="1" height="1" fill="#ffffff"/>
      
      <rect x="3" y="15" width="3" height="3" fill="#000000"/>
      <rect x="4" y="16" width="1" height="1" fill="#ffffff"/>
      
      {/* List text lines */}
      <rect x="8" y="5" width="12" height="3" fill="#000000"/>
      <rect x="8" y="6" width="12" height="1" fill="#404040"/>
      
      <rect x="8" y="10" width="12" height="3" fill="#000000"/>
      <rect x="8" y="11" width="12" height="1" fill="#404040"/>
      
      <rect x="8" y="15" width="12" height="3" fill="#000000"/>
      <rect x="8" y="16" width="12" height="1" fill="#404040"/>
    </svg>
  );
};

export const PixelClose = ({ size = 'md', className = '' }: PixelIconProps) => {
  const sizeMap = { sm: 16, md: 20, lg: 32 };
  const iconSize = sizeMap[size];
  
  return (
    <svg 
      width={iconSize} 
      height={iconSize} 
      viewBox="0 0 24 24" 
      className={`pixel-icon-${size} ${className}`}
      style={{ imageRendering: 'pixelated' }}
    >
      {/* X pattern with 3D effect */}
      <rect x="5" y="5" width="3" height="3" fill="#ff0000"/>
      <rect x="8" y="8" width="3" height="3" fill="#ff0000"/>
      <rect x="11" y="11" width="3" height="3" fill="#ff0000"/>
      <rect x="13" y="8" width="3" height="3" fill="#ff0000"/>
      <rect x="16" y="5" width="3" height="3" fill="#ff0000"/>
      <rect x="13" y="13" width="3" height="3" fill="#ff0000"/>
      <rect x="8" y="13" width="3" height="3" fill="#ff0000"/>
      <rect x="5" y="16" width="3" height="3" fill="#ff0000"/>
      <rect x="16" y="16" width="3" height="3" fill="#ff0000"/>
      
      {/* Shadows */}
      <rect x="6" y="6" width="2" height="2" fill="#800000"/>
      <rect x="9" y="9" width="2" height="2" fill="#800000"/>
      <rect x="12" y="12" width="2" height="2" fill="#800000"/>
      <rect x="14" y="9" width="2" height="2" fill="#800000"/>
      <rect x="17" y="6" width="2" height="2" fill="#800000"/>
    </svg>
  );
};

export const PixelMoreHorizontal = ({ size = 'md', className = '' }: PixelIconProps) => {
  const sizeMap = { sm: 16, md: 20, lg: 32 };
  const iconSize = sizeMap[size];
  
  return (
    <svg 
      width={iconSize} 
      height={iconSize} 
      viewBox="0 0 24 24" 
      className={`pixel-icon-${size} ${className}`}
      style={{ imageRendering: 'pixelated' }}
    >
      {/* Three dots with 3D effect */}
      <rect x="4" y="10" width="4" height="4" fill="#000000"/>
      <rect x="5" y="11" width="2" height="2" fill="#404040"/>
      
      <rect x="10" y="10" width="4" height="4" fill="#000000"/>
      <rect x="11" y="11" width="2" height="2" fill="#404040"/>
      
      <rect x="16" y="10" width="4" height="4" fill="#000000"/>
      <rect x="17" y="11" width="2" height="2" fill="#404040"/>
    </svg>
  );
};

export const PixelTag = ({ size = 'md', className = '' }: PixelIconProps) => {
  const sizeMap = { sm: 16, md: 20, lg: 32 };
  const iconSize = sizeMap[size];
  
  return (
    <svg 
      width={iconSize} 
      height={iconSize} 
      viewBox="0 0 24 24" 
      className={`pixel-icon-${size} ${className}`}
      style={{ imageRendering: 'pixelated' }}
    >
      {/* Tag shape - diamond/bookmark style */}
      <rect x="3" y="8" width="12" height="8" fill="#0000ff" stroke="#000000" strokeWidth="1"/>
      <rect x="4" y="9" width="10" height="6" fill="#4169e1"/>
      
      {/* Tag hole */}
      <rect x="6" y="11" width="2" height="2" fill="#000000"/>
      <rect x="7" y="12" width="1" height="1" fill="#ffffff"/>
      
      {/* Tag point */}
      <rect x="15" y="10" width="2" height="2" fill="#0000ff"/>
      <rect x="17" y="11" width="2" height="2" fill="#0000ff"/>
      <rect x="19" y="12" width="2" height="2" fill="#0000ff"/>
      <rect x="17" y="13" width="2" height="2" fill="#0000ff"/>
      <rect x="15" y="14" width="2" height="2" fill="#0000ff"/>
      
      {/* Tag shadow */}
      <rect x="4" y="15" width="10" height="1" fill="#000080"/>
      <rect x="14" y="9" width="1" height="6" fill="#000080"/>
      
      {/* Point shadow */}
      <rect x="16" y="11" width="1" height="1" fill="#000080"/>
      <rect x="18" y="12" width="1" height="1" fill="#000080"/>
      <rect x="20" y="13" width="1" height="1" fill="#000080"/>
      <rect x="18" y="14" width="1" height="1" fill="#000080"/>
      <rect x="16" y="15" width="1" height="1" fill="#000080"/>
    </svg>
  );
};

export const PixelClock = ({ size = 'md', className = '' }: PixelIconProps) => {
  const sizeMap = { sm: 16, md: 20, lg: 32 };
  const iconSize = sizeMap[size];
  
  return (
    <svg 
      width={iconSize} 
      height={iconSize} 
      viewBox="0 0 24 24" 
      className={`pixel-icon-${size} ${className}`}
      style={{ imageRendering: 'pixelated' }}
    >
      {/* Clock face */}
      <rect x="4" y="4" width="16" height="16" fill="#ffffff" stroke="#000000" strokeWidth="2"/>
      <rect x="5" y="5" width="14" height="14" fill="#f0f0f0"/>
      
      {/* Hour markers */}
      <rect x="11" y="2" width="2" height="2" fill="#000000"/>
      <rect x="20" y="11" width="2" height="2" fill="#000000"/>
      <rect x="11" y="20" width="2" height="2" fill="#000000"/>
      <rect x="2" y="11" width="2" height="2" fill="#000000"/>
      
      {/* Clock hands */}
      <rect x="12" y="8" width="2" height="6" fill="#ff0000"/>
      <rect x="12" y="12" width="6" height="2" fill="#ff0000"/>
      
      {/* Center dot */}
      <rect x="11" y="11" width="2" height="2" fill="#000000"/>
      
      {/* Clock shadow */}
      <rect x="5" y="19" width="14" height="1" fill="#c0c0c0"/>
      <rect x="19" y="5" width="1" height="14" fill="#c0c0c0"/>
    </svg>
  );
};

export const PixelMapPin = ({ size = 'md', className = '' }: PixelIconProps) => {
  const sizeMap = { sm: 16, md: 20, lg: 32 };
  const iconSize = sizeMap[size];
  
  return (
    <svg 
      width={iconSize} 
      height={iconSize} 
      viewBox="0 0 24 24" 
      className={`pixel-icon-${size} ${className}`}
      style={{ imageRendering: 'pixelated' }}
    >
      {/* Pin head */}
      <rect x="8" y="3" width="8" height="10" fill="#ff0000" stroke="#000000" strokeWidth="1"/>
      <rect x="9" y="4" width="6" height="8" fill="#ff4444"/>
      
      {/* Pin center */}
      <rect x="10" y="6" width="4" height="4" fill="#ffffff"/>
      <rect x="11" y="7" width="2" height="2" fill="#ff0000"/>
      
      {/* Pin point */}
      <rect x="11" y="13" width="2" height="2" fill="#ff0000"/>
      <rect x="11" y="15" width="2" height="2" fill="#cc0000"/>
      <rect x="12" y="17" width="1" height="2" fill="#cc0000"/>
      <rect x="12" y="19" width="1" height="2" fill="#990000"/>
      
      {/* Pin shadow */}
      <rect x="9" y="12" width="6" height="1" fill="#cc0000"/>
      <rect x="15" y="4" width="1" height="8" fill="#cc0000"/>
    </svg>
  );
};

export const PixelStar = ({ size = 'md', className = '' }: PixelIconProps) => {
  const sizeMap = { sm: 16, md: 20, lg: 32 };
  const iconSize = sizeMap[size];
  
  return (
    <svg 
      width={iconSize} 
      height={iconSize} 
      viewBox="0 0 24 24" 
      className={`pixel-icon-${size} ${className}`}
      style={{ imageRendering: 'pixelated' }}
    >
      {/* Star shape with priority indicator */}
      <rect x="11" y="3" width="2" height="4" fill="#ffff00"/>
      <rect x="10" y="7" width="4" height="2" fill="#ffff00"/>
      <rect x="7" y="9" width="4" height="2" fill="#ffff00"/>
      <rect x="13" y="9" width="4" height="2" fill="#ffff00"/>
      <rect x="9" y="11" width="6" height="2" fill="#ffff00"/>
      <rect x="8" y="13" width="2" height="4" fill="#ffff00"/>
      <rect x="14" y="13" width="2" height="4" fill="#ffff00"/>
      <rect x="10" y="17" width="4" height="2" fill="#ffff00"/>
      <rect x="11" y="19" width="2" height="2" fill="#ffff00"/>
      
      {/* Star outline */}
      <rect x="11" y="2" width="2" height="1" fill="#000000"/>
      <rect x="9" y="7" width="1" height="2" fill="#000000"/>
      <rect x="14" y="7" width="1" height="2" fill="#000000"/>
      <rect x="6" y="9" width="1" height="2" fill="#000000"/>
      <rect x="17" y="9" width="1" height="2" fill="#000000"/>
      
      {/* Star shadow */}
      <rect x="12" y="4" width="1" height="3" fill="#cccc00"/>
      <rect x="11" y="8" width="2" height="1" fill="#cccc00"/>
      <rect x="8" y="10" width="3" height="1" fill="#cccc00"/>
      <rect x="13" y="10" width="3" height="1" fill="#cccc00"/>
    </svg>
  );
};