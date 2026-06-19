export const cameraSteps = [
  {
    id: 1,
    stepNumber: 1,
    stepSub: "Step 1 · Camera Mode",
    stepTitle: "Start in Aperture Priority (Av)",
    stepBody: "Turn the mode dial to Av. Camera will handle shutter speed automatically. For portraits and single-person photos, this is the easiest way to get blurred background.",
    imagePath: "/image-1.png"
  },
  {
    id: 2,
    stepNumber: 2,
    stepSub: "Step 2 · Aperture Settings",
    stepTitle: "Set a Wide Aperture (f/1.8 - f/2.8)",
    stepBody: "Rotate the main dial to set the lowest possible f-number. A lower f-number means a wider aperture, which lets in more light and creates a shallow depth of field.",
    imagePath: "/image-2.png"
  },
  {
    id: 3,
    stepNumber: 3,
    stepSub: "Step 3 · Focus Mode",
    stepTitle: "Switch to One-Shot AF",
    stepBody: "Press the AF selection button and set it to One-Shot AF. This is ideal for stationary subjects since it locks the focus when you press the shutter button halfway down.",
    imagePath: "/image-3.png"
  },
  {
    id: 4,
    stepNumber: 4,
    stepSub: "Step 4 · Focus Point",
    stepTitle: "Choose Single-Point AF",
    stepBody: "Manually select a single active focus point. Use the multicontroller to place this point directly over the eye of your subject for razor-sharp portraits.",
    imagePath: "/image-4.png"
  },
  {
    id: 5,
    stepNumber: 5,
    stepSub: "Step 5 · ISO Configuration",
    stepTitle: "Keep ISO Low (ISO 100 - 400)",
    stepBody: "Keep your ISO low in daylight or bright conditions to ensure the cleanest possible image. Raise it only when you need to maintain a fast shutter speed in low light.",
    imagePath: "/image-5.png"
  },
  {
    id: 6,
    stepNumber: 6,
    stepSub: "Step 6 · White Balance",
    stepTitle: "Select White Balance Preset",
    stepBody: "Instead of Auto White Balance (AWB), set it manually (e.g. Daylight, Shade, Cloudy) to match your environment. This keeps skin tones and colors consistent.",
    imagePath: "/image-6.png"
  }
];

// Predefined real data for Male Normal Poses 1-30
const realMaleNormalPoses = [
  {
    title: "Relaxed Standing",
    desc: "Body 45° turned, one leg slightly forward, hands near pockets. Chin a little down, eyes to camera. Works well with blurred background.",
    sub: "Normal · Portrait",
    image: "/male/normal/n-1.png"
  },
  {
    title: "Casual Lean Pose",
    desc: "Lean against wall or railing, one shoulder touching, weight on one leg. Slight smile, natural look. Good for outdoor casual shoots.",
    sub: "Normal · Portrait",
    image: "/male/normal/n-2.png"
  },
  {
    title: "Walking Forward Pose",
    desc: "Walk towards camera naturally, one step forward, hands relaxed. Slight motion feel, eyes on camera. Perfect for street or path photos.",
    sub: "Normal · Portrait",
    image: "/male/normal/n-3.png"
  },
  {
    title: "Hands in Pocket Pose",
    desc: "Stand straight, both hands in front pocket or side pocket, slight body turn. Confident look, chin level. Classic casual portrait.",
    sub: "Normal · Portrait",
    image: "/male/normal/n-4.png"
  },
  {
    title: "Side Profile Turn",
    desc: "Body facing side, face turned 3/4 towards camera, one hand on hair or jacket. Soft smile, elegant look. Great for artistic portraits.",
    sub: "Normal · Portrait",
    image: "/male/normal/n-5.png"
  },
  {
    title: "Crossed Arms Confident",
    desc: "Stand straight, arms crossed over chest, slight shoulder turn. Confident expression, eyes direct to camera. Works for professional portraits.",
    sub: "Normal · Portrait",
    image: "/male/normal/n-6.png"
  },
  {
    title: "One Hand on Hip Pose",
    desc: "Stand with one hand on hip, other hand relaxed, slight body angle. Casual confident look, chin slightly up. Good for outdoor casual shots.",
    sub: "Normal · Portrait",
    image: "/male/normal/n-7.png"
  },
  {
    title: "Sitting on Bench Pose",
    desc: "Sit on bench or chair, one leg over other, hands on knee or relaxed. Natural relaxed look, slight smile. Perfect for casual portrait sessions.",
    sub: "Normal · Portrait",
    image: "/male/normal/n-8.png"
  },
  {
    title: "Looking Away Pose",
    desc: "Body facing camera, face turned slightly away, looking off to side. Thoughtful expression, natural light on face. Artistic and moody feel.",
    sub: "Normal · Portrait",
    image: "/male/normal/n-9.png"
  },
  {
    title: "Jacket Half-On Pose",
    desc: "Jacket half-on, one arm in sleeve, other arm relaxed. Casual stylish look, slight body turn. Great for fashion or street style photos.",
    sub: "Normal · Portrait",
    image: "/male/normal/n-10.png"
  },
  {
    title: "Police Uniform Casual Pose",
    desc: "Location: Police Station Main Gate. Wear police uniform casually, one hand on belt, slight body turn. Confident serious look, eyes direct.",
    sub: "Normal · Casual",
    image: "/male/normal/n-11.png"
  },
  {
    title: "Khaki Uniform Standing Pose",
    desc: "Location: Park Bench. Stand straight in khaki police uniform near park bench, hands behind back, slight smile. Background: Lush green trees.",
    sub: "Normal · Casual",
    image: "/male/normal/n-12.png"
  },
  {
    title: "Police Cap Adjust Pose",
    desc: "Location: Street Wall with graffiti. One hand adjusting police cap, other hand relaxed, slight body angle. Background: Colorful graffiti wall, urban street.",
    sub: "Normal · Casual",
    image: "/male/normal/n-13.png"
  },
  {
    title: "Belt Hand Rest Pose",
    desc: "Location: Old Building Corridor with stone arches. One hand on police belt, other hand relaxed, slight shoulder turn. Background: Heritage building.",
    sub: "Normal · Casual",
    image: "/male/normal/n-14.png"
  },
  {
    title: "Uniform Shirt Pocket Pose",
    desc: "Location: Beach Side with sand and waves. One hand in shirt pocket of police uniform, slight body turn, natural smile. Background: Beach with ocean waves.",
    sub: "Normal · Casual",
    image: "/male/normal/n-15.png"
  },
  {
    title: "Hoodie Street Walk Pose",
    desc: "Location: Urban Street with concrete wall. Outfit: Black hoodie + jeans. Walking forward, slight motion, hands in hoodie pocket, looking at camera. Vibe: Casual, trendy, Gen Z.",
    sub: "Normal · Casual",
    image: "/male/normal/n-16.png"
  },
  {
    title: "Jacket Over Shoulder Pose",
    desc: "Location: Cafe Outdoor with wooden table. Outfit: White shirt + dark jacket over shoulder + chinos. Standing beside cafe table, jacket over one shoulder, slight smile. Vibe: Smart casual.",
    sub: "Normal · Casual",
    image: "/male/normal/n-17.png"
  },
  {
    title: "T-Shirt Rolled Sleeve Pose",
    desc: "Location: Park Bench with green trees. Outfit: Navy blue t-shirt (sleeves rolled) + shorts. Sitting on bench, one leg over other, arms relaxed on knees. Vibe: Relaxed, summer.",
    sub: "Normal · Casual",
    image: "/male/normal/n-18.png"
  },
  {
    title: "Kurta Modern Pose",
    desc: "Location: Heritage Building with stone pillars. Outfit: White modern kurta + black jeans. Standing near stone pillar, one hand on pillar, slight body turn. Vibe: Traditional meet modern.",
    sub: "Normal · Fashion",
    image: "/male/normal/n-19.png"
  },
  {
    title: "Denim Jacket Coffee Pose",
    desc: "Location: Coffee Shop Counter with indoor warm lighting. Outfit: Denim jacket + plain white tee + dark jeans. Standing at coffee counter, holding cup, slight smile. Vibe: Coffee lover, urban.",
    sub: "Normal · Casual",
    image: "/male/normal/n-20.png"
  },
  {
    title: "Striped Shirt Window Pose",
    desc: "Location: Home Window with natural sunlight. Outfit: Striped casual shirt (unbuttoned) + black tee + jeans. Standing near window, one hand on curtain, light on face. Vibe: Morning casual, home photo.",
    sub: "Normal · Casual",
    image: "/male/normal/n-21.png"
  },
  {
    title: "Blazer Party Pose",
    desc: "Location: Night Club Entrance with neon lights. Outfit: Navy blazer + black shirt + slim jeans. Standing at club entrance, one hand in pocket, confident smirk. Vibe: Party night, nightlife.",
    sub: "Normal · Fashion",
    image: "/male/normal/n-22.png"
  },
  {
    title: "Flannel Shirt Tie Pose",
    desc: "Location: Forest Trail with trees and sunlight. Outfit: Red flannel shirt (tied around waist) + white tee + cargo pants. Walking on trail, flannel tied, hands relaxed. Vibe: Outdoor adventure, hiking.",
    sub: "Normal · Casual",
    image: "/male/normal/n-23.png"
  },
  {
    title: "Polo Shirt Basketball Pose",
    desc: "Location: Basketball Court (indoor). Outfit: Red polo shirt + black track pants. Standing near basketball hoop, one hand on ball, slight smile. Vibe: Sports, active lifestyle.",
    sub: "Normal · Casual",
    image: "/male/normal/n-24.png"
  },
  {
    title: "Sherwani Modern Pose",
    desc: "Location: Wedding Hall with royal decor. Outfit: Light gold modern sherwani + churidar. Standing in wedding hall, hands clasped, elegant smile. Vibe: Wedding, formal, royal.",
    sub: "Normal · Fashion",
    image: "/male/normal/n-25.png"
  },
  {
    title: "Tank Top Gym Pose",
    desc: "Location: Gym Entrance with equipment visible. Outfit: Black tank top + gym shorts + sneakers. Standing at gym entrance, one hand on wall, confident look. Vibe: Fitness, gym lifestyle.",
    sub: "Normal · Casual",
    image: "/male/normal/n-26.png"
  },
  {
    title: "Printed Shirt Beach Pose",
    desc: "Location: Beach Sunset with orange sky and waves. Outfit: Printed casual shirt (open) + white tee + linen pants. Walking on beach, shirt open, hands relaxed, sunset behind. Vibe: Beach vacation.",
    sub: "Normal · Casual",
    image: "/male/normal/n-27.png"
  },
  {
    title: "Silk Shirt Restaurant Pose",
    desc: "Location: Fine Dining Restaurant with candles and dim lights. Outfit: Black silk shirt + tailored jeans + leather shoes. Sitting at restaurant table, one hand on glass, elegant look. Vibe: Upscale dining.",
    sub: "Normal · Fashion",
    image: "/male/normal/n-28.png"
  },
  {
    title: "Chambray Shirt Rooftop Pose",
    desc: "Location: Apartment Rooftop with city view. Outfit: Chambray shirt (buttoned) + beige chinos + brown boots. Standing on rooftop, hands on railing, city view behind. Vibe: Urban professional, evening.",
    sub: "Normal · Casual",
    image: "/male/normal/n-29.png"
  },
  {
    title: "Graphic Tee Skate Pose",
    desc: "Location: Skate Park with concrete ramps and graffiti. Outfit: Graphic tee + ripped jeans + skate shoes. Standing with skateboard, one foot on board, slight smirk. Vibe: Street style, youth culture.",
    sub: "Normal · Casual",
    image: "/male/normal/n-30.png"
  }
];

// Dynamically generate the 180 placeholder poses (30 per gender/type combination)
const generatePoses = () => {
  const list = [];
  const genders = ["male", "female"];
  const poseTypes = ["normal", "event", "group"];
  let id = 1;

  genders.forEach(gender => {
    poseTypes.forEach(type => {
      for (let i = 1; i <= 30; i++) {
        const capGender = gender.charAt(0).toUpperCase() + gender.slice(1);
        const capType = type.charAt(0).toUpperCase() + type.slice(1);

        // Check if we need to insert real Male Normal poses (1-30)
        if (gender === "male" && type === "normal" && i <= 30) {
          const realPose = realMaleNormalPoses[i - 1];
          list.push({
            id: id++,
            gender: gender,
            poseType: type,
            poseTitle: realPose.title,
            poseDescription: realPose.desc,
            poseSub: realPose.sub,
            imagePath: realPose.image
          });
        } else {
          list.push({
            id: id++,
            gender: gender,
            poseType: type,
            poseTitle: `${capGender} ${capType} Pose ${i}`,
            poseDescription: `Placeholder: Body 45° turned, one leg forward. Suitable for ${type} shoot.`,
            poseSub: `${capType} · Portrait`,
            imagePath: null
          });
        }
      }
    });
  });

  return list;
};

export const poses = generatePoses();
