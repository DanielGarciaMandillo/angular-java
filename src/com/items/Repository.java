package com.items;

import java.util.ArrayList;

public class Repository {

	ArrayList<Item> itemList = new ArrayList<Item>();

	public ArrayList<Item> getItems() {
		return itemList;
	}

	public void addItem(Item item) {
		itemList.add(item);
	}

}
