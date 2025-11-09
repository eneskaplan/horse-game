export function getColorCode(colorName) {
    const colorMap = {
      'Red': '#FF0000',
      'Blue': '#0000FF',
      'Green': '#008000',
      'Yellow': '#FFFF00',
      'Purple': '#800080',
      'Orange': '#FFA500',
      'Pink': '#FFC0CB',
      'Cyan': '#00FFFF',
      'Brown': '#A52A2A',
      'Black': '#000000',
      'White': '#FFFFFF',
      'Grey': '#808080',
      'Magenta': '#FF00FF',
      'Lime': '#00FF00',
      'Navy': '#000080',
      'Teal': '#008080',
      'Maroon': '#800000',
      'Olive': '#808000',
      'Silver': '#C0C0C0',
      'Gold': '#FFD700'
    }
    return colorMap[colorName] || '#CCCCCC'
  }