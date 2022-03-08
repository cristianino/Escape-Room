export function CreateRoom0(): void {
  //variable to store if door is open
  let isDoorOpen = false

  //create door entity
  let door = new Entity()

  //add gltf shape
  door.addComponent(new GLTFShape('models/room0/Puzzle01_Door.glb'))

  //add transform and set it in position
  door.addComponent(new Transform({ position: new Vector3(21.18, 10.8, 24.5) }))

  //create animator and add animation clips
  let doorAnimator = new Animator()
  doorAnimator.addClip(new AnimationState('Door_Open', { looping: false }))
  door.addComponent(doorAnimator)

  //create audio source component, set audio clip and add it to door entity
  door.addComponent(new AudioSource(new AudioClip('sounds/door_squeak.mp3')))

  const sweetNFT = new Entity()
  const sweetNFTshapeComponent = new NFTShape(
    'ethereum://0x495f947276749ce646f68ac8c248420045cb7b5e/24027790195096824599953724808349415730162767414777275349733826143142453182465',
    {
      color: Color3.Green(),
      style: PictureFrameStyle.Gold_Edges,
    }
  )
  sweetNFT.addComponent(sweetNFTshapeComponent)
  sweetNFT.addComponent(
    new Transform({
      position: new Vector3(24.65, 13, 24.32),
    }),
  )
  engine.addEntity(sweetNFT)

  const oceanNFT = new Entity()
  const oceanNFTshapeComponent = new NFTShape(
    'ethereum://0x495f947276749ce646f68ac8c248420045cb7b5e/24027790195096824599953724808349415730162767414777275349733826144241964810241',
    {
      color: Color3.Green(),
      style: PictureFrameStyle.Gold_Edges,
    }
  )
  oceanNFT.addComponent(oceanNFTshapeComponent)
  oceanNFT.addComponent(
    new Transform({
      position: new Vector3(19.16, 13, 24.32),
    }),
  )
  engine.addEntity(oceanNFT)

  sweetNFT.addComponent(
    new OnPointerDown((e) => {
      openNFTDialog(
        "ethereum://0x495f947276749ce646f68ac8c248420045cb7b5e/24027790195096824599953724808349415730162767414777275349733826143142453182465"
      )
    })
  )

  oceanNFT.addComponent(
    new OnPointerDown((e) => {
      openNFTDialog(
        "ethereum://0x495f947276749ce646f68ac8c248420045cb7b5e/24027790195096824599953724808349415730162767414777275349733826144241964810241"
      )
    })
  )

  //listen to onclick event to toggle door state
  door.addComponent(
    new OnPointerDown((event) => {
      if (!isDoorOpen) {
        doorAnimator.getClip('Door_Open').play()
        door.getComponent(AudioSource).playOnce()
      } else {
        doorAnimator.getClip('Door_Close').play()
        door.getComponent(AudioSource).playOnce()
      }
      isDoorOpen = !isDoorOpen
    }),
  )

  //add door entity to engine
  engine.addEntity(door)
}
