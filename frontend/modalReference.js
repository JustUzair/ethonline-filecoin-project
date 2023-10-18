<div class="w-full h-screen bg-gradient-to-tr from-cyan-400 to-cyan-700">
  <div
    id="authOverlay"
    class="fixed z-10 left-0 top-0 h-full w-full flex items-center justify-center py-3 px-2 overflow-y-auto bg-white/80 backdrop-blur-sm scale-y-0 -translate-x-full opacity-0 origin-center"
  >
    <div
      id="fourth"
      class="bg-white/0 max-w-sm m-auto mb-0 sm:mb-auto p-3 border border-white/0 rounded-2xl shadow-sm"
    >
      <div
        id="second"
        class="bg-white p-4 sm:p-8 w-full rounded-xl shadow-sm scale-y-0 opacity-0"
      >
        <div id="third" class="relative scale-y-0 opacity-0">
          <form>
            <div class="grid grid-cols-2 gap-5">
              <input
                type="text"
                class="border border-gray-500 px-4 py-2 focus:outline-none focus:border-purple-500"
                placeholder="First Name"
              />
              <input
                type="text"
                class="border border-gray-500 px-4 py-2 focus:outline-none focus:border-purple-500"
                placeholder="Last Name"
              />
              <input
                type="email"
                class="border border-gray-500 px-4 py-2 focus:outline-none focus:border-purple-500 col-span-2"
                placeholder="Email"
              />
              <input
                type="tel"
                class="border border-gray-500 px-4 py-2 focus:outline-none focus:border-purple-500 col-span-2"
                placeholder="Phone"
              />
              <textarea
                cols="10"
                rows="5"
                class="border border-gray-500 px-4 py-2 focus:outline-none focus:border-purple-500 col-span-2"
                placeholder="Write your message..."
              ></textarea>
            </div>
            <input
              type="submit"
              value="Send Message"
              class="focus:outline-none mt-5 bg-purple-500 px-4 py-2 text-white font-bold w-full"
            />
          </form>

          <div class="text-center">
            <button
              onClick={closeAuthModal}
              class="bg-neutral-100 text-neutral-400 font-semibold text-xl rounded-md border-b-[3px] px-3 py-1"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="text-center">
    <button
      onClick={openAuthModal}
      class="bg-white text-cyan-400 font-semibold text-2xl rounded-md border-b-[3px] px-6 py-3 mt-16"
    >
      Open
    </button>
  </div>
</div>;
