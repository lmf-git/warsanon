
<!-- TOC -->





<!-- TODO: Make a wiki -->

- [NEXT STEPS:](#next-steps)
- [INFO / DATA](#info--data)
    - [BATTLE DATA](#battle-data)
    - [TRAVEL / MISC DATA](#travel--misc-data)
    - [REPORTS](#reports)
        - [HISTORY](#history)
    - [RANKINGS](#rankings)
- [GAMEPLAY](#gameplay)
    - [MECHANICS](#mechanics)
        - [TIME](#time)
        - [MORALITY](#morality)
        - [GEOGRAPHY & BIOMES](#geography--biomes)
        - [MORALE](#morale)
        - [UNITS](#units)
        - [BUILD](#build)
        - [TRADE](#trade)
        - [BATTLE](#battle)
    - [ACTIVITES](#activites)
        - [GATHERING](#gathering)
        - [CRAFTING](#crafting)
        - [MORALITY](#morality)
    - [PROPERTIES](#properties)
    - [ITEMS](#items)
        - [ETC](#etc)
    - [NARRATIVE](#narrative)
    - [MAP](#map)
- [PERSONAL](#personal)
    - [CHARACTER](#character)
        - [LIVES](#lives)
            - [SPAWN](#spawn)
        - [DEVELOPMENT](#development)
        - [PROFILE](#profile)
        - [FINANCES](#finances)
- [COMMUNITY](#community)
    - [LEAD](#lead)
        - [Alliances / Groups](#alliances--groups)
    - [POLITICS](#politics)
- [BACKEND](#backend)
    - [ADMIN](#admin)
        - [World Start Checklist](#world-start-checklist)
- [BUSINESS](#business)
    - [MONETIZE](#monetize)
        - [AESTHETICS](#aesthetics)
- [ENTITIES](#entities)
    - [ITEM LIST](#item-list)
        - [MYTHICAL](#mythical)
        - [LEGENDARY](#legendary)
        - [RARE](#rare)
        - [PRECIOUS](#precious)
        - [COMMON](#common)
    - [STRUCTURE LIST](#structure-list)
    - [BUILDING LIST](#building-list)
- [FUTURE IDEAS](#future-ideas)

<!-- /TOC -->


## NEXT STEPS:
<a id="markdown-next-steps" name="next-steps"></a>      

    Add map page loader.

    Unit group details
        Actions
        Styling

    Make logo smaller in game mode.

    MAP ZOOM FIX
    Spawn does not update other devices green etc?
    Unit group added / created does not update page.
    [location]/units no success snackbar / link to map / data not updated.
    Need to handle session expired...
    Go to map location by query.
    Refactor create username to cloudfunction

    Next tick counter everywhere?
    Prevent mobilisation / move on water.
    
    Make sure UI reflects processed pending event data change.
        Spawn added player not removed on mobilise...?  


    Ships capacity calculated for mobilising water.


    PENDING EVENTS
        MOVE, MOBILISE, PENDING ACTVITIES CANCELLATION.

        SET PENDING EVENTS
            ATTACK / BATTLE
                Check last unit group move/action time
                attack unit group
                attack structure
                Group already moved / killed

                If attacked unit group is x% smaller, allowed to flee.
                If slower or not, cannot flee battle.

                Large enough unit groups are forced into battle for at least one turn, after that they can move.

                PENDING CONQUER
                    Group can move into structure after wall destroyed
                    Cannot attack spawn
                    Game ticks award loyalty to owner of most units in structure at 100, ownership change.

            GATHERING / CRAFT
                Can direct to gather from unit group page
                And from map unit group info pop up

            MOVE
                Show pending mobillisation and moves in relevant overview pages.

        CANCEL PENDING EVENTS

    MOVEMENT
        Can't move over water or structure check
        Show biomes on movement compass

    BUILD
        RECRUIT
        STRUCTURES
        Implement structure capacity
            Upgrades increase capacity
            Capacity applies to all units

    ITEMS
        Drop / Pick up items
        TRADE
        Someone else picked up.
        Trade page
            Trades | Offers
                Allow cancellations.





<!-- NEW SECTION -->
## INFO / DATA
<a id="markdown-info--data" name="info--data"></a>


### BATTLE DATA
<a id="markdown-battle-data" name="battle-data"></a>
number of kills
wins/losses


### TRAVEL / MISC DATA
<a id="markdown-travel--misc-data" name="travel--misc-data"></a>
    track how far players have travelled, , experience


### REPORTS
<a id="markdown-reports" name="reports"></a>

#### HISTORY
<a id="markdown-history" name="history"></a>
    View:	http://humanhistorytimeline.com/
    World history that is updated and can view age and events clearly and beautifully


### RANKINGS
<a id="markdown-rankings" name="rankings"></a>
    Rankings for wealth (unless player hides name)
    Score
    Distance moved
<!-- END SECTION -->


<!-- NEW SECTION -->
## GAMEPLAY
<a id="markdown-gameplay" name="gameplay"></a>


### MECHANICS
<a id="markdown-mechanics" name="mechanics"></a>


#### TIME
<a id="markdown-time" name="time"></a>

    Game "tick" represents 1 hour of game time, like GTA
    Get current day time based on division


#### MORALITY
<a id="markdown-morality" name="morality"></a>

    Morality Points Per Day, can accuse other players of being evil or good.
    Point to event/report for justification (comment too?)
    Can be used in trials
    If player taken to trial, you can see their best and worst acts (Tied in to lore and history/reports/events)


#### GEOGRAPHY & BIOMES
<a id="markdown-geography--biomes" name="geography--biomes"></a>
    Functionality of different biomes, what can be done with them?


#### MORALE
<a id="markdown-morale" name="morale"></a>
    [] Friendly units passing by makes citizens happier and gives a temporary morale boost.
    [] Bring GOOD & EVIL into the game, incentivise players to play roles.


#### UNITS
<a id="markdown-units" name="units"></a>
    Show units by location
    Move
    Control / Ownership

    JOIN ACTIVITY UNIT GROUPS
    Lets you join another group to be more protected but does not let them control units

    JOIN UNIT GROUP / MERGE
    Lets another player control your units but maintains your ownership

    JOIN ONGOING BATTLE.

    Add CPU / Unit Groups Via Admin
    Show players / armies dead to CPU / other unit groups
    CPU unit groups either aggressive or non aggressive

    Simplified carrying capacity
    Units (wagons?) good for carrying but defenceless
    A weakness factor based on unprotected / defenceless units (heavy losses on them incurred or disadvantage protecting them)

    Unit Details Page
        Status: 
            Idle
            Combat
            Gathering | Crafting | ?

        Structure
            Unorganised
            Unit Group
            Activity Group
            Other Army

#### BUILD
<a id="markdown-build" name="build"></a>
    [] Build city

    Build on owned land within a city?
        [] Structures
            [] Camp
            [] Village
            [] Town
            [] City
            [] Port

            [] Quarry
            [] Lumberyard
                Productivity bonuses
                Storage


        [] Buildings
            [] Bank
                [] Offer interest rates for banking with you
                [] Request loans from a bank & terms
                [] Show bank credibility to stop people getting scammed + build trust
            [] Warehouse
            [] Barracks
            [] Stable
            [] Smithy
            [] Workshop
            [] Harbour
            [] Port

#### TRADE
<a id="markdown-trade" name="trade"></a>
    [] Trade within city or if goods stored in warehouse in city
    [] Create your own currency
    [] Set official Structure Currency
    [] Transport goods
        [] Rent out caravan / Transport
            [] Risk accepted (Cheaper)
            [] Goods secured / guaranteed (More expensive)


    Basic trade
        [] Trade within same property

    Complex additions:
        [] Trade across coordinates later

    Can't herd without a shepherd?
    Cows move slow, beef moves fast.

    Economy must have same kind of function as paperclip game + https://candybox2.github.io/candybox/



#### BATTLE
<a id="markdown-battle" name="battle"></a>
    [] Attack city
        [] Destroy / capture / siege
        [] If under siege for 15 game days in a row... city destroyed and turned to ruins.
        [] If attacked with trebuchet continuously for 3 days... turned to ruins.

    [] Attack map unit group
        [] Kill
        [] Capture

	OUTCOME
        Scavenge victory setting
        Spend five minutes * world speed to take equipment from losers.
        capture defeated enemies and give options to their fate, allow for real diplomacy this way       
        Ransom
            [] Make / Reject / Demand ransom offers + Negotiate
<!-- END SECTION -->

<!-- NEW SECTION -->
### ACTIVITES
<a id="markdown-activites" name="activites"></a>
    [] Treasure Trail
        [] From spawn point type
        [] From player name & village name anagram starting point type
        
    [] Bounties
        [] Players head becomes item for redeeming bounty (this can be fought over)

        Retreat setting, run from battle after x losses.
        Armies consist of unit groups or may be one very large group.

#### GATHERING
<a id="markdown-gathering" name="gathering"></a>
    Gathering activities reduce abundance of that area. Abundance affects gathering effectiveness. Abundance refreshes over time.

    [] Woodcutting
        Consumes: Hatchets
        Produces: Woods

    [] Farming
        Consumes: Seeds
        Produces: Foods

    [] Mining
        Consumes: Pickaxes
        Produces: Ores / Gems


#### CRAFTING
<a id="markdown-crafting" name="crafting"></a>
    [] Alchemist

    [] Smithing
        Consumes: Ore / Wood 
        Produces: Metal Goods

    [] Crafting
        Consumes: Fabrics / Gems / Pelts & Furs / etc
        Produces: Crafted Goods
<!-- END SECTION -->

#### MORALITY
<a id="markdown-morality" name="morality"></a>
    [] Low morality players can have their units captured + turned, Good morality players units must be captured or ransomed.
    [] Determine what affects morality rating?


### PROPERTIES
<a id="markdown-properties" name="properties"></a>
    Noblemen -> Ambassadors. To capture a location player must have ambassador there for <base> 5 hours.
    Other players have ambassadors there too?
    <setting> Defending enemy base disadvantage.
    basic / rare / legendary village types emphasis on rarity
    
    // Allow players to spawn in your city - Rust kinda feature

### ITEMS
<a id="markdown-items" name="items"></a>


#### ETC
<a id="markdown-etc" name="etc"></a>
        Very powerful weapon that causes demons to come for it
        Salt, sugar/ cloth as resources/trade
        Need more ideas for resources/items

    Rares
        [] Last spotted location - when is it registered as spotted?
<!-- END SECTION -->


### NARRATIVE
<a id="markdown-narrative" name="narrative"></a>

    [] XP
    [] Levels
    [] Skills / Abilities

    WORLD VICTORY / END GAME
        Prestiguous awards for winners of previous worlds.


    TUTORIAL
        SHOW MAP BUTTONS AND FUNCTIONALITY - HIGHLIGHT

    RECOMMENDED PATH
        Gather
        Build
        Fight








### MAP
<a id="markdown-map" name="map"></a>
    [] Move via map (draw path tracing center crosshair, transform into vectors?)
    [] Get from current highlighted cell to page
    [] Add controls (i) button bottom left?
    [] When reloading the map go back to last viewed tile.
    
    VISIBILITY
        Local player visibility gisiama, bad actions lead to more visibility (see all the assholes in your area like GTA)
        At x distance, scouts know something is there.
        At x - y distance, scouts know what it is.
        At x - z distance, scouts know where it's going.

    MOVEMENT
        While travelling or on a command, armies may be split and given separate orders.

    Use Forza Horizon new map items being added animation
    Scale + drop down with camera shake for new shit, dragging the camera around


    Minimap?




## PERSONAL
<a id="markdown-personal" name="personal"></a>


### CHARACTER
<a id="markdown-character" name="character"></a>
    Make other human elements, main human elements and traits or mannerisms, differences
    Pregnancy -> lead to triplets twins etc, gender etc use reproduction formula!
    Use ethnicity in reproduction!
    Bring an ethnicity based class system with different benefits to population and players

#### LIVES
<a id="markdown-lives" name="lives"></a>
    [] Reproduce
    [] Death mechanics
    [] Spawn points

    Opportunity to monetize additional characters?

    User
        Characters

    Deaths -> Shows character Deaths

    If character dies, how does player restart? Where do lost assets go?

##### SPAWN
<a id="markdown-spawn" name="spawn"></a>
    Storage at spawn, can only store x (200?) items
    EXCLUSION ZONE AROUND A SPAWN, CAN'T KILL, CAN'T BUILD



#### DEVELOPMENT
<a id="markdown-development" name="development"></a>
Implement levelling and experience system.

#### PROFILE
<a id="markdown-profile" name="profile"></a>
    Players -> displays of wealth on map
    displays of wealth on profile and comparisons height of towers etc to get cosmetic money flowing
    place temples and library on map dedicated to them for boost


#### FINANCES
<a id="markdown-finances" name="finances"></a>
    Shows debt (public info)
    Shows assets by location for usage
    Show wealth overall (public / hidden?)



## COMMUNITY
<a id="markdown-community" name="community"></a>

### LEAD
<a id="markdown-lead" name="lead"></a>
    [] Taxes - Trade taxes, building taxes (% of items produced stable, smithy, etc go to ruler / coffers)
    [] Control coffers

#### Alliances / Groups
<a id="markdown-alliances--groups" name="alliances--groups"></a>
    [] Structures and locations can be owned by users, alliances, or groups.
    FORUM
    Points like stackexchange and extremely visible actions, like facebook.

### POLITICS
<a id="markdown-politics" name="politics"></a>
    Voting
    At beginning, have the right to arbitrate over small decisions (Village names, Regions, etc)
    Control of the city
    Who leaves | age limits | who enters
    free speech -> have strict effects on chat, etc.
    arranged marriage
    what other customs may be allowed
    elect people to positions
    Rebels set if they do not pay taxes to the region owner. And if they attack kingdoms who are in favour/protected by that region.

    Villages / Cities / Control / Organise
        [] Donate money to coffers
        [] Elections
            [] Citizenship mechanism?


    SPAWN STRUCTURE POLITICS
        GET IN
            Attempt to seize power
                Takes time, can be killed -> If not, takes power.
                If vote of no confidence period

            In power, call election
                Ignore election result EVIL
                Accept election result GOOD

        GET OUT
            Vote of no coonfidence
            Revolution
            Resign
            Exiled


## BACKEND
<a id="markdown-backend" name="backend"></a>

### ADMIN
<a id="markdown-admin" name="admin"></a>

#### World Start Checklist
<a id="markdown-world-start-checklist" name="world-start-checklist"></a>
    [] World settings
    [] Add spawn points: North, East, South, West



## BUSINESS
<a id="markdown-business" name="business"></a>



### MONETIZE
<a id="markdown-monetize" name="monetize"></a>


#### AESTHETICS
<a id="markdown-aesthetics" name="aesthetics"></a>
[] Decorate / Show Off
    [] Rankings
    [] Honours
    [] Village / Structure Paid Visuals

Premium only spawns, like Priffindas?








<!-- NEW SECTION -->
## ENTITIES
<a id="markdown-entities" name="entities"></a>

### ITEM LIST
<a id="markdown-item-list" name="item-list"></a>

    [] Items inspired by friends, figure out how to award
    [] Award rare items based on % per capita 0.1% inspired
    [] Charts Of James (Best sight in game)
    [] Ryan's Warhammer (Strongest boost)
    [] Nathan's Olive Branch (Best kindness / Compassion)
    [] Rahman Abicus (Best trade advantage)
    [] Suleman's Pendant (Shows location and attention vividly, attention seeker item)

    [] Kill someone in your own city -> Effects you somehow EVIL
    [] Kill innocents -> EVIL

    [] Kill evil -> GOOD

    [] Award items for certain achievements / milestones / firsts

    Rankings for who owns the most of certain type items with ability to hide from publicity

#### MYTHICAL
<a id="markdown-mythical" name="mythical"></a>

#### LEGENDARY
<a id="markdown-legendary" name="legendary"></a>

#### RARE
<a id="markdown-rare" name="rare"></a>

#### PRECIOUS
<a id="markdown-precious" name="precious"></a>

#### COMMON
<a id="markdown-common" name="common"></a>


### STRUCTURE LIST
<a id="markdown-structure-list" name="structure-list"></a>

### BUILDING LIST
<a id="markdown-building-list" name="building-list"></a>
<!-- END SECTION -->





## FUTURE IDEAS
<a id="markdown-future-ideas" name="future-ideas"></a>
    WORLD CREATION (PRIVATE)
        Can name new found places
        Submit new unit ideas (Imagining a template)

    MOVEMENT
        // click and drag from village to another (overview mode or some shit) to send attacks or support or resources, 
        panel to customise options and window to drag from/to villages

    CHARACTER
        Player has mood stat that needs to be improved or consequences


    Very useful to add into game or something like it
    https://d20md.com/

