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

// Predefined real data for Male Event Poses 1-30
const realMaleEventPoses = [
  {
    title: "Corporate Business Conference",
    desc: "Location: Mumbai office lobby. Outfit: Navy blue suit + white shirt. Standing near conference podium, one hand on podium, professional confident look.",
    sub: "Event · Corporate",
    image: "/male/events/e-1.png"
  },
  {
    title: "Rock Concert Stage Pose",
    desc: "Location: Pune concert stage. Outfit: Black graphic tee + ripped jeans + black boots. Standing on stage edge, one hand on mic stand, cool smirk.",
    sub: "Event · Concert",
    image: "/male/events/e-2.png"
  },
  {
    title: "Tech Product Launch",
    desc: "Location: Bangalore tech hub. Outfit: Light gray blazer + white shirt + charcoal jeans. Standing near product screen, one hand on screen, confident smile.",
    sub: "Event · Tech",
    image: "/male/events/e-3.png"
  },
  {
    title: "Kolhapur Food Festival",
    desc: "Location: Kolhapur outdoor food stalls. Outfit: White kurta + beige chinos. Standing near food counter, holding plate, natural friendly smile.",
    sub: "Event · Food",
    image: "/male/events/e-4.png"
  },
  {
    title: "Pune Art Gallery",
    desc: "Location: Pune art gallery. Outfit: Burgundy sweater + black jeans. Standing near painting, one hand on wall, thoughtful expression.",
    sub: "Event · Art",
    image: "/male/events/e-5.png"
  },
  {
    title: "Wedding Reception Sabyasabi Style",
    desc: "Location: Mumbai luxury hotel. Outfit: Deep maroon sherwani + gold churidar. Standing near flower arch, one hand on arch, elegant groom look.",
    sub: "Event · Wedding",
    image: "/male/events/e-6.png"
  },
  {
    title: "Sangeet Dance Performance",
    desc: "Location: Pune outdoor stage. Outfit: Black kurta + silver embroidery + black jeans. Dancing pose on stage, one hand raised, energetic fun smile.",
    sub: "Event · Wedding",
    image: "/male/events/e-7.png"
  },
  {
    title: "Haldi Ceremony Traditional",
    desc: "Location: Kolhapur traditional house. Outfit: Bright yellow kurta-pajama + orange shawl. Sitting on decorated chair, hands showing Haldi, happy excited smile.",
    sub: "Event · Wedding",
    image: "/male/events/e-8.png"
  },
  {
    title: "Baraat Royal Groom Entry",
    desc: "Location: Mumbai street baraat. Outfit: Cream sherwani + gold turban + gold jewelry. Sitting on decorated horse, one hand on reins, royal groom smile.",
    sub: "Event · Wedding",
    image: "/male/events/e-9.png"
  },
  {
    title: "Wedding Ceremony Mandap",
    desc: "Location: Pune Ganapati temple. Outfit: White dhoti-pant + red silk angavastram. Standing at mandap, hands joined in prayer, sacred serious expression.",
    sub: "Event · Wedding",
    image: "/male/events/e-10.png"
  },
  {
    title: "Wedding Photo Booth Trending",
    desc: "Location: Bangalore wedding photo booth. Outfit: Navy bandhgala + white shirt. Standing at photo booth, one hand on frame, trendy Insta pose, cool smile.",
    sub: "Event · Wedding",
    image: "/male/events/e-11.png"
  },
  {
    title: "Wedding Dinner Guest",
    desc: "Location: Mumbai luxury hotel dinner. Outfit: Charcoal gray suit + light blue shirt. Sitting at dinner table, one hand on wine glass, elegant relaxed pose.",
    sub: "Event · Wedding",
    image: "/male/events/e-12.png"
  },
  {
    title: "Mehendi Casual Traditional",
    desc: "Location: Kolhapur outdoor garden. Outfit: Light green kurta + white pajama + orange scarf. Standing in garden, holding Mehendi cone, playful fun smile.",
    sub: "Event · Wedding",
    image: "/male/events/e-13.png"
  },
  {
    title: "Wedding After Party Night",
    desc: "Location: Pune night club. Outfit: Black leather jacket + white tee + black jeans. Standing near club entrance, one hand on jacket, night party cool look.",
    sub: "Event · Wedding",
    image: "/male/events/e-14.png"
  },
  {
    title: "Wedding Morning Fresh Groom",
    desc: "Location: Mumbai groom bedroom. Outfit: White fresh kurta + light blue pajama. Sitting near makeup mirror, one hand on face, fresh morning groom, soft smile.",
    sub: "Event · Wedding",
    image: "/male/events/e-15.png"
  },
  {
    title: "Vaar Traditional Groom Entry",
    desc: "Location: Kolhapur traditional house entrance. Outfit: Cream sherwani + red dupatta + gold turban. Walking through entrance, one hand on garland, graceful walk.",
    sub: "Event · Wedding",
    image: "/male/events/e-16.png"
  },
  {
    title: "Wedding Roast Comedy Night",
    desc: "Location: Pune indoor stage. Outfit: Navy blazer + white shirt + black jeans. Standing on stage with mic, one hand on mic, funny comedy expression.",
    sub: "Event · Wedding",
    image: "/male/events/e-17.png"
  },
  {
    title: "Gift Exchange Formal Guest",
    desc: "Location: Mumbai wedding hall. Outfit: Light gray suit + white shirt + blue tie. Standing near gift table, holding gift box, polite formal smile.",
    sub: "Event · Wedding",
    image: "/male/events/e-18.png"
  },
  {
    title: "Dance Performance Showtime",
    desc: "Location: Bangalore wedding stage. Outfit: Black kurta + red embroidery + black jeans. Mid-dance jump on stage, both arms raised, energetic performance.",
    sub: "Event · Wedding",
    image: "/male/events/e-19.png"
  },
  {
    title: "Congratulations Best Friend",
    desc: "Location: Pune wedding photo area. Outfit: Burgundy bandhgala + white shirt. Standing with groom, one hand on shoulder, warm happy smile, congratulating.",
    sub: "Event · Wedding",
    image: "/male/events/e-20.png"
  },
  {
    title: "Mumbai Fashion Show Runway",
    desc: "Location: Mumbai fashion runway. Outfit: Designer black velvet jacket + white tee + black jeans. Walking on runway, one hand on jacket, confident model walk.",
    sub: "Event · Fashion",
    image: "/male/events/e-21.png"
  },
  {
    title: "Kolhapur Heritage Festival",
    desc: "Location: Kolhapur heritage site. Outfit: Brown kurta-pajama + orange shawl. Standing near heritage pillar, one hand on pillar, respectful cultural pose.",
    sub: "Event · Cultural",
    image: "/male/events/e-22.png"
  },
  {
    title: "Pune Charity Marathon",
    desc: "Location: Pune marathon start line. Outfit: Blue running jersey + black shorts + running shoes. Standing at start, one hand on race bib, athletic ready pose.",
    sub: "Event · Sports",
    image: "/male/events/e-23.png"
  },
  {
    title: "Bangalore Book Launch",
    desc: "Location: Bangalore bookstore. Outfit: Beige blazer + white shirt + charcoal jeans. Standing near book display, holding book, one hand on book, intellectual smile.",
    sub: "Event · Literary",
    image: "/male/events/e-24.png"
  },
  {
    title: "Mumbai Awards Gala Night",
    desc: "Location: Mumbai awards stage. Outfit: Black tuxedo + white shirt + black bow tie. Standing on red carpet, holding award trophy, proud elegant smile.",
    sub: "Event · Awards",
    image: "/male/events/e-25.png"
  },
  {
    title: "Bangalore Tech Startup Conference",
    desc: "Location: Bangalore tech conference hall. Outfit: Dark gray blazer + white shirt + black jeans. Standing near screen, one hand on screen, confident entrepreneur pose.",
    sub: "Event · Tech",
    image: "/male/events/e-26.png"
  },
  {
    title: "Pune Indie Music Festival",
    desc: "Location: Pune outdoor festival stage. Outfit: Distressed black denim jacket + graphic tee + ripped jeans. Standing on stage with guitar, one hand on neck, cool artistic pose.",
    sub: "Event · Music",
    image: "/male/events/e-27.png"
  },
  {
    title: "Kolhapur Wellness Charity Run",
    desc: "Location: Kolhapur park running track. Outfit: White running tee + black tights + running shoes. Running pose on track, one arm forward, active motion, healthy smile.",
    sub: "Event · Wellness",
    image: "/male/events/e-28.png"
  },
  {
    title: "Mumbai Luxury Gala Dinner",
    desc: "Location: Mumbai luxury ballroom. Outfit: Navy tuxedo + white shirt + navy bow tie. Sitting at dinner table, one hand on wine glass, sophisticated elegant pose.",
    sub: "Event · Luxury",
    image: "/male/events/e-29.png"
  },
  {
    title: "Pune Film Premiere Red Carpet",
    desc: "Location: Pune cinema theater premiere. Outfit: Black leather blazer + white tee + black jeans. Standing on red carpet, one hand on poster, cinematic cool pose.",
    sub: "Event · Cinema",
    image: "/male/events/e-30.png"
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
        }
        // Check if we need to insert real Male Event poses (1-30)
        else if (gender === "male" && type === "event" && i <= 30) {
          const realPose = realMaleEventPoses[i - 1];
          list.push({
            id: id++,
            gender: gender,
            poseType: type,
            poseTitle: realPose.title,
            poseDescription: realPose.desc,
            poseSub: realPose.sub,
            imagePath: realPose.image
          });
        }
        // Check if we need to insert real Female Normal poses (1-10)
        else if (gender === "female" && type === "normal" && i <= 10) {
          list.push({
            id: id++,
            gender: gender,
            poseType: type,
            poseTitle: `Female Normal Pose ${i}`,
            poseDescription: `Placeholder: Body 45° turned, one leg forward. Suitable for normal shoot.`,
            poseSub: `Normal · Portrait`,
            imagePath: `/female/normal/ng-${i}.png`
          });
        }
        else {
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
