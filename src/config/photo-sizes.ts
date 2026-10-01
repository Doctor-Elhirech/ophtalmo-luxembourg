// Match the existing CSS layout so srcset loads enough pixels without oversizing.
// These are download hints only; CSS continues to control the visible dimensions.
const container = 'min(1536px, calc(100vw - clamp(44px, 9vw, 176px)))';
const storyColumn = `calc((${container} - clamp(48px, 7vw, 120px)) * 0.48)`;
const galleryGap = 'clamp(18px, 2.5vw, 36px)';
// Cover-cropped photos also need enough source pixels for the box's height.
const consultationCover = 1.2;
const exteriorCover = 772 / 546 / (4 / 3);
const arrivalCover = 772 / 546 / 1.08;

export const photoSizes = {
  hero: container,
  homeDoctor: `(max-width: 600px) calc(${container} * ${consultationCover}), (max-width: 1100px) calc(${container} * 0.465 * ${consultationCover}), calc(((${container} - clamp(55px, 9vw, 145px)) / 2 - 28px) * ${consultationCover})`,
  doctor: `(max-width: 900px) min(680px, ${container}), max(624px, calc(${storyColumn} * ${consultationCover / 0.94}))`,
  arrival: `(max-width: 600px) calc(${container} * ${exteriorCover}), (max-width: 900px) min(680px, ${container}), calc(${storyColumn} * ${arrivalCover})`,
  homeGallery: `(max-width: 600px) ${container}, calc(${container} * 0.475)`,
  homeGalleryExterior: `(max-width: 600px) calc(${container} * ${exteriorCover}), calc(${container} * 0.475 * ${exteriorCover})`,
  practiceGallery: `(max-width: 600px) ${container}, (max-width: 900px) calc((${container} - ${galleryGap}) / 2), calc((${container} - ${galleryGap} * 2) / 3)`,
};
