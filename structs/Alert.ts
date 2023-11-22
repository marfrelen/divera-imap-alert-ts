require('dotenv').config();

export default class Alert {
    private _number: string|null = null;
    private _title: string|null = null;
    private _priority: boolean = false;
    private _text: string|null = null;
    private _address: string|null = null;
    private _lat: number|null = null;
    private _lng: number|null = null;
    private _scene_object: string|null = null;
    private _caller: string|null = null;
    private _patient: string|null = null;
    private _remark: string|null = null;
    private _units: string|null = null;
    private _destination: string|null = null;
    private _destination_address: string|null = null;
    private _destination_lat: string|null = null;
    private _destination_lng: string|null = null;
    private _additional_text_1: string|null = null;
    private _additional_text_2: string|null = null;
    private _additional_text_3: string|null = null;
    private _ric: string|null = null;
    private _vehicle: string|null = null;
    private _person: string|null = null;
    private _delay: string|null = null;
    private _coordinates: string|null = null;
    private _coordinatesX: string|null = null;
    private _coordinatesY: string|null = null;
    private _news: boolean = false;
    private _id: number|null = null;
    private _cluster_ids: Array<string> = [];
    private _group_ids: Array<string> = [];
    private _user_cluster_relation_ids: Array<string> = [];
    private _vehicle_ids: Array<string> = [];
    private _alarmcode_id: Array<string> = [];
    private _tries: number = 0;
    private _createdAt: number;

    constructor(
        number: string|null = null,
        title: string|null = null,
        priority: boolean = false,
        text: string|null = null,
        address: string|null = null,
        lat: number|null = null,
        lng: number|null = null,
        scene_object: string|null = null,
        caller: string|null = null,
        patient: string|null = null,
        remark: string|null = null,
        units: string|null = null,
        destination: string|null = null,
        destination_address: string|null = null,
        destination_lat: string|null = null,
        destination_lng: string|null = null,
        additional_text_1: string|null = null,
        additional_text_2: string|null = null,
        additional_text_3: string|null = null,
        ric: string|null = null,
        vehicle: string|null = null,
        person: string|null = null,
        delay: string|null = null,
        coordinates: string|null = null,
        coordinatesX: string|null = null,
        coordinatesY: string|null = null,
        news: boolean = false,
        id: number|null = null,
        cluster_ids: Array<string> = [],
        group_ids: Array<string> = [],
        user_cluster_relation_ids: Array<string> = [],
        vehicle_ids: Array<string> = [],
        alarmcode_id: Array<string> = [],
        tries: number = 0,
    ) {
        this._number = number;
        this._title = title;
        this._priority = priority;
        this._text = text;
        this._address = address;
        this._lat = lat;
        this._lng = lng;
        this._scene_object = scene_object;
        this._caller = caller;
        this._patient = patient;
        this._remark = remark;
        this._units = units;
        this._destination = destination;
        this._destination_address = destination_address;
        this._destination_lat = destination_lat;
        this._destination_lng = destination_lng;
        this._additional_text_1 = additional_text_1;
        this._additional_text_2 = additional_text_2;
        this._additional_text_3 = additional_text_3;
        this._ric = ric;
        this._vehicle = vehicle;
        this._person = person;
        this._delay = delay;
        this._coordinates = coordinates;
        this._coordinatesX = coordinatesX;
        this._coordinatesY = coordinatesY;
        this._news = news;
        this._id = id;
        this._cluster_ids = cluster_ids;
        this._group_ids = group_ids;
        this._user_cluster_relation_ids = user_cluster_relation_ids;
        this._vehicle_ids = vehicle_ids;
        this._alarmcode_id = alarmcode_id;
        this._tries = tries;
        this._createdAt = new Date().getTime();
    }

    get number(): string|null {
        return this._number;
    }

    set number(value: string|null) {
        this._number = value;
    }

    get title(): string|null {
        return this._title;
    }

    set title(value: string|null) {
        this._title = value;
    }

    get priority(): boolean {
        return this._priority;
    }

    set priority(value: boolean) {
        this._priority = value;
    }

    get text(): string|null {
        return this._text;
    }

    set text(value: string|null) {
        this._text = value;
    }

    get address(): string|null {
        return this._address;
    }

    set address(value: string|null) {
        this._address = value;
    }

    get lat(): number|null {
        return this._lat;
    }

    set lat(value: number|null) {
        this._lat = value;
    }

    get lng(): number|null {
        return this._lng;
    }

    set lng(value: number|null) {
        this._lng = value;
    }

    get scene_object(): string|null {
        return this._scene_object;
    }

    set scene_object(value: string|null) {
        this._scene_object = value;
    }

    get caller(): string|null {
        return this._caller;
    }

    set caller(value: string|null) {
        this._caller = value;
    }

    get patient(): string|null {
        return this._patient;
    }

    set patient(value: string|null) {
        this._patient = value;
    }

    get remark(): string|null {
        return this._remark;
    }

    set remark(value: string|null) {
        this._remark = value;
    }

    get units(): string|null {
        return this._units;
    }

    set units(value: string|null) {
        this._units = value;
    }

    get destination(): string|null {
        return this._destination;
    }

    set destination(value: string|null) {
        this._destination = value;
    }

    get destination_address(): string|null {
        return this._destination_address;
    }

    set destination_address(value: string|null) {
        this._destination_address = value;
    }

    get destination_lat(): string|null {
        return this._destination_lat;
    }

    set destination_lat(value: string|null) {
        this._destination_lat = value;
    }

    get destination_lng(): string|null {
        return this._destination_lng;
    }

    set destination_lng(value: string|null) {
        this._destination_lng = value;
    }

    get additional_text_1(): string|null {
        return this._additional_text_1;
    }

    set additional_text_1(value: string|null) {
        this._additional_text_1 = value;
    }

    get additional_text_2(): string|null {
        return this._additional_text_2;
    }

    set additional_text_2(value: string|null) {
        this._additional_text_2 = value;
    }

    get additional_text_3(): string|null {
        return this._additional_text_3;
    }

    set additional_text_3(value: string|null) {
        this._additional_text_3 = value;
    }

    get ric(): string|null {
        return this._ric;
    }

    set ric(value: string|null) {
        this._ric = value;
    }

    get vehicle(): string|null {
        return this._vehicle;
    }

    set vehicle(value: string|null) {
        this._vehicle = value;
    }

    get person(): string|null {
        return this._person;
    }

    set person(value: string|null) {
        this._person = value;
    }

    get delay(): string|null {
        return this._delay;
    }

    set delay(value: string|null) {
        this._delay = value;
    }

    get coordinates(): string|null {
        return this._coordinates;
    }

    set coordinates(value: string|null) {
        this._coordinates = value;
    }

    get coordinatesX(): string|null {
        return this._coordinatesX;
    }

    set coordinatesX(value: string|null) {
        this._coordinatesX = value;
    }

    get coordinatesY(): string|null {
        return this._coordinatesY;
    }

    set coordinatesY(value: string|null) {
        this._coordinatesY = value;
    }

    get news(): boolean {
        return this._news;
    }

    set news(value: boolean) {
        this._news = value;
    }

    get id(): number|null {
        return this._id;
    }

    set id(value: number|null) {
        this._id = value;
    }

    get cluster_ids(): Array<string> {
        return this._cluster_ids;
    }

    set cluster_ids(value: Array<string>) {
        this._cluster_ids = value;
    }

    get group_ids(): Array<string> {
        return this._group_ids;
    }

    set group_ids(value: Array<string>) {
        this._group_ids = value;
    }

    get user_cluster_relation_ids(): Array<string> {
        return this._user_cluster_relation_ids;
    }

    set user_cluster_relation_ids(value: Array<string>) {
        this._user_cluster_relation_ids = value;
    }

    get vehicle_ids(): Array<string> {
        return this._vehicle_ids;
    }

    set vehicle_ids(value: Array<string>) {
        this._vehicle_ids = value;
    }

    get alarmcode_id(): Array<string> {
        return this._alarmcode_id;
    }

    set alarmcode_id(value: Array<string>) {
        this._alarmcode_id = value;
    }

    get tries(): number {
        return this._tries;
    }

    set tries(value: number) {
        this._tries = value;
    }

    incrementTries():void {
        this._tries ++;
    }

    get createdAt(): number {
        return this._createdAt;
    }
}