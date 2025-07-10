export const getPostureColor = (status) => {
  switch (status) {
    case "good":
      return "#10B981"
    case "warning":
      return "#F59E0B"
    case "poor":
      return "#EF4444"
    case "background1":
      return "#10B981"  
    case "background2":
      return "#EF4444"  
    default:
      return "#6B7280"
  }
}

export const getPostureMessage = (status) => {
  switch (status) {
    case "good":
      return "Great posture!";
    case "warning":
      return "Slight slouching";
    case "poor":
      return "Poor posture - adjust!";
    case "unknown":
      return "Position yourself";
    case "attire1":
      return "✅ You look professionally dressed"  
    case "attire2":
      return "⚠️ Your attire may not look professional"    
    case "clean":
      return "✅ Clean"   
    case "messy":
      return "⚠️Messy"  
    case "groomingGood":
      return "✅ Face is clearly visible and properly framed"   
    case "grooming1":
      return "⚠️ Face appears blurry. Improve lighting or focus."
    case "grooming2":
      return "⚠️ Face size seems too small or too large"    
    case "grooming3":
      return "⚠️ Face is not centered. Align your face more toward the middle."            
    case "fail":
      return "No face detected. Make sure your face is clearly visible."    
    case "background1":
      return "Plain Background"  
    case "background2":
      return "Messy Background"                  
    default:
      return status;
  }
};

