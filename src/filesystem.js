// Browser-side filesystem adapter.
// A production runtime should map its POSIX-like filesystem calls to OPFS
// (Origin Private File System) and/or IndexedDB.

export async function getOPFSRoot() {
  if (!navigator.storage?.getDirectory) {
    throw new Error("This browser does not provide the Origin Private File System API.");
  }
  return navigator.storage.getDirectory();
}
