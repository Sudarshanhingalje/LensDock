import React, { useState, useEffect } from "react";
import { PageHero, Reveal } from "../components/PageHero";
import { getCameraSteps, getPoses } from "../lib/api";

export default function Poses() {
  const [activeTab, setActiveTab] = useState("camera"); // "camera" or "poses"
  const [gender, setGender] = useState("male"); // "male" or "female"
  const [poseType, setPoseType] = useState("normal"); // "normal", "event", or "group"

  const [cameraSteps, setCameraSteps] = useState([]);
  const [loadingCamera, setLoadingCamera] = useState(true);
  const [cameraError, setCameraError] = useState(null);

  const [poses, setPoses] = useState([]);
  const [loadingPoses, setLoadingPoses] = useState(true);
  const [posesError, setPosesError] = useState(null);

  // Fetch camera steps on mount
  useEffect(() => {
    setLoadingCamera(true);
    getCameraSteps()
      .then((data) => {
        setCameraSteps(data || []);
        setCameraError(null);
      })
      .catch((err) => {
        console.error("Error fetching camera steps:", err);
        setCameraError("Failed to load camera guide steps.");
      })
      .finally(() => {
        setLoadingCamera(false);
      });
  }, []);

  // Fetch poses when filters (gender, poseType) change
  useEffect(() => {
    setLoadingPoses(true);
    getPoses(gender, poseType)
      .then((data) => {
        setPoses(data || []);
        setPosesError(null);
      })
      .catch((err) => {
        console.error("Error fetching poses:", err);
        setPosesError("Failed to load poses guide.");
      })
      .finally(() => {
        setLoadingPoses(false);
      });
  }, [gender, poseType]);

  return (
    <>
      <PageHero
        eyebrow="LensDock Guide"
        title={
          <>
            Pose & <span className="text-glow">Camera Guide</span>
          </>
        }
        subtitle="Learn how to use your Canon 80D and choose poses in 10–15 minutes. First understand camera basics, then pick poses directly from here while shooting with LensDock."
      />

      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Top Selectors / Filters (Side-by-side buttons instead of dropdowns) */}
        <div className="flex flex-col md:flex-row gap-6 mb-8 border-b border-border/60 pb-8 justify-between items-start md:items-center">
          <div className="flex flex-wrap gap-6 items-center">
            {/* Camera Model Selection */}
            <div>
              <span className="block text-xs uppercase tracking-widest text-muted-foreground mb-2 font-medium">Camera Model</span>
              <div className="inline-flex rounded-full bg-slate-950 border border-border p-1">
                <span className="rounded-full px-4 py-1.5 text-xs font-semibold bg-primary text-primary-foreground shadow-sm">
                  Canon 80D
                </span>
              </div>
            </div>

            {/* Pose Type Selection */}
            <div>
              <span className="block text-xs uppercase tracking-widest text-muted-foreground mb-2 font-medium">Pose Category</span>
              <div className="inline-flex rounded-full bg-slate-950 border border-border p-1">
                {["normal", "event", "group"].map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setPoseType(t);
                      setActiveTab("poses"); // Switch tab to poses to see results immediately
                    }}
                    className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                      poseType === t
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section Toggle Tabs (Camera Guide vs Pose Guide) */}
          <div className="inline-flex rounded-full bg-slate-950 border border-border p-1 w-full md:w-auto justify-center">
            <button
              onClick={() => setActiveTab("camera")}
              className={`flex-1 md:flex-none rounded-full px-6 py-2.5 text-sm font-semibold transition-all ${
                activeTab === "camera"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Camera Guide
            </button>
            <button
              onClick={() => setActiveTab("poses")}
              className={`flex-1 md:flex-none rounded-full px-6 py-2.5 text-sm font-semibold transition-all ${
                activeTab === "poses"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Pose Guide
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "camera" ? (
          // Camera Guide Section
          <div className="space-y-6">
            {loadingCamera ? (
              <div className="py-20 text-center text-sm text-muted-foreground animate-pulse">
                Loading camera guide steps...
              </div>
            ) : cameraError ? (
              <div className="py-20 text-center text-sm text-red-500">{cameraError}</div>
            ) : (
              cameraSteps.map((step, idx) => (
                <Reveal key={step.id || idx} delay={idx * 0.05}>
                  <div className="flex flex-col md:flex-row items-stretch md:items-center gap-6 border border-dashed border-border rounded-2xl p-5 bg-card/20 backdrop-blur-sm transition-all hover:border-primary/30 duration-300">
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1 font-semibold">
                        {step.stepSub}
                      </div>
                      <div className="text-lg font-semibold text-foreground mb-2">
                        {step.stepTitle}
                      </div>
                      <div className="text-sm text-muted-foreground leading-relaxed">
                        {step.stepBody}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center text-3xl text-primary font-light py-2 md:py-0">
                      <span className="hidden md:inline">➝</span>
                      <span className="inline md:hidden rotate-90">➝</span>
                    </div>

                    <div className="flex-1 overflow-hidden rounded-xl border border-border bg-slate-900/60 aspect-video md:aspect-[16/10] flex items-center justify-center">
                      <img
                        src={step.imagePath}
                        alt={step.stepTitle}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                      />
                    </div>
                  </div>
                </Reveal>
              ))
            )}
          </div>
        ) : (
          // Pose Guide Section
          <div>
            {/* Filters Inside Pose Guide Tab */}
            <div className="flex flex-col sm:flex-row gap-6 justify-between items-start sm:items-center mb-8 bg-card/10 border border-border p-4 rounded-2xl">
              {/* Gender selector */}
              <div>
                <span className="block text-xs uppercase tracking-widest text-muted-foreground mb-2 font-medium">Gender</span>
                <div className="inline-flex rounded-full bg-slate-950 border border-border p-1">
                  {["male", "female"].map((g) => (
                    <button
                      key={g}
                      onClick={() => setGender(g)}
                      className={`rounded-full px-5 py-1.5 text-xs font-semibold transition-all ${
                        gender === g
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {g.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pose Category (sync with top selector) */}
              <div>
                <span className="block text-xs uppercase tracking-widest text-muted-foreground mb-2 font-medium">Pose Category</span>
                <div className="inline-flex rounded-full bg-slate-950 border border-border p-1">
                  {["normal", "event", "group"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setPoseType(t)}
                      className={`rounded-full px-5 py-1.5 text-xs font-semibold transition-all ${
                        poseType === t
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {t.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {loadingPoses ? (
              <div className="py-20 text-center text-sm text-muted-foreground animate-pulse">
                Loading pose recommendation cards...
              </div>
            ) : posesError ? (
              <div className="py-20 text-center text-sm text-red-500">{posesError}</div>
            ) : poses.length === 0 ? (
              <div className="py-20 text-center text-sm text-muted-foreground">
                No poses found for the selected category.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {poses.map((pose, idx) => (
                  <Reveal key={pose.id || idx} delay={(idx % 6) * 0.05}>
                    <div className="bg-card/25 backdrop-blur-sm rounded-2xl border border-border p-4 transition-all hover:border-primary/30 hover:scale-[1.02] duration-300 flex flex-col justify-between h-full">
                      <div>
                        {/* Placeholder pose box as requested */}
                        {/* TODO: Replace placeholder boxes with real AI-generated pose images later.
                            I will add my own pose images from AI and update the card data. */}
                        <div className="h-28 border border-dashed border-border/80 rounded-xl flex flex-col items-center justify-center text-center p-4 bg-slate-950/80 mb-4 hover:bg-slate-950 transition-colors duration-300">
                          <span className="text-xs font-bold text-muted-foreground/40 uppercase tracking-wider mb-1">
                            {pose.gender.toUpperCase()} - {pose.poseType.toUpperCase()} POSE {idx + 1}
                          </span>
                          <span className="text-[10px] text-muted-foreground/30 font-mono">
                            [AI Image Placeholder]
                          </span>
                        </div>

                        <div className="text-[10px] uppercase tracking-[0.2em] text-primary mb-1 font-bold">
                          {pose.poseSub}
                        </div>
                        <div className="font-semibold text-foreground text-sm mb-1.5">
                          {pose.poseTitle}
                        </div>
                        <div className="text-xs text-muted-foreground leading-relaxed">
                          {pose.poseDescription}
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
