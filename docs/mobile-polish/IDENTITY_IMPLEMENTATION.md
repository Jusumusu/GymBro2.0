# Approved D — Aperture identity

The real header, onboarding, favicon and PWA assets now use the original reviewed D paths. The app keeps the Gym Bro name, Aero type/palette and existing application/start/scope identities. Header wordmark weight follows the approved D treatment.

`public/aperture-{light,dark}.svg` are theme-specific original symbols. The corresponding 192/512px PNGs are rendered at exact sizes from those vectors with transparent safe margins. Both source manifests point to their appropriate themed assets. Classic prepaint appearance resolution also updates the favicon, touch icon and displayed brand images for manual or system theme changes. Legacy icon filenames remain updated aliases, so existing references continue to work.

`node scripts/build-aperture-icons.mjs` reproduces the raster outputs using the repository Chromium harness. No image-generation approximation, extra runtime library, journal identity change or user media processing is involved.

Three pure cases check approved path fidelity, valid PNG dimensions/transparency, unchanged app identity scopes and theme synchronization. Actual integrated captures verify header images plus favicon/touch/manifest paths in light and dark modes. The old-preview-to-current-build browser update preserves complete journals, active values and photo bytes.

Installed PWA icon refresh is controlled by browser/OS caching and may lag the in-app identity. No immediate Home Screen icon replacement is promised. Production remains unchanged until release authorization.
