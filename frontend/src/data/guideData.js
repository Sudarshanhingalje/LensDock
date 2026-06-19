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
        list.push({
          id: id++,
          gender: gender,
          poseType: type,
          poseTitle: `${capGender} ${capType} Pose ${i}`,
          poseDescription: `Placeholder: Body 45° turned, one leg forward. Suitable for ${type} shoot.`,
          poseSub: `${capType} · Portrait`
        });
      }
    });
  });

  return list;
};

export const poses = generatePoses();
